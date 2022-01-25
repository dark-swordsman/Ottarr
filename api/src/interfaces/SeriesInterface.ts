import SeriesModel, { Series } from "../models/SeriesModel";
import { Episode } from "../models/EpisodeModel";
import { Season } from "../models/SeasonModel";

import SeasonInterface from "./SeasonInterface";
import TMDBInterface from "./TMDBInterface";
import EpisodeInterface from "./EpisodeInterface";

class SeriesInterface {
  static createSeries(data: Series): Promise<Series> {
    return SeriesModel.create(data);
  }

  static addNewSeries(id: string): Promise<Series> {
    // find TMDB series + seasons, create series, season?, and episodes
    return new Promise((resolve, reject) => {
      TMDBInterface.getTVShowInfo(id)
        .then(async (result) => {
          const seriesData: Series = {
            name: result.name,
            episodes: [],
            seasons: [],
            card: result.poster_path,
            banner: result.backdrop_path,
            tmdb_id: result.id
          }

          // create series
          let series: Series = await SeriesInterface.createSeries(seriesData);

          let seasons: Array<{ [key: string]: any }> = [];
          let seasonsTMDB: Array<{ [key: string]: any }> = [];
          let episodes: Array<{ [key: string]: any }> = [];
          
          // await Promise.all makes the rest of the code wait
          // iterate over result seasons and create in db
          await Promise.all(result.seasons.map(async (season: { [key: string]: any }) => {
            const seasonData: Season = {
              name: season.name,
              number: season.season_number,
              series: series._id,
              episodes: [],
              card: season.poster_path
            }

            seasonsTMDB.push(await TMDBInterface.getSeasonInfo(`${result.id}`, season.season_number));

            seasons.push(await SeasonInterface.createSeason(seasonData));
          }));

          // iterate over episodes to create in db
          await Promise.all(seasonsTMDB.map(async (season: { [key: string]: any }) => {
            await Promise.all(season.episodes.map(async (episode: { [key: string]: any }) => {
              const episodeData: Episode = {
                name: episode.name,
                number: episode.episode_number,
                type: "episode",
                series: series._id!,
                season: seasons.find((dbSeason) => dbSeason.number === season.season_number)!._id,
                card: episode.still_path
              }
              
              episodes.push(await EpisodeInterface.createEpisode(episodeData));
            }));
          }));
          
          const seasonIds = seasons.map((season) => season._id);
          const episodeIds = episodes.map((episode) => episode._id);

          // update seasons and series with episodes
          resolve(await SeriesInterface.findSeriesByIdAndUpdate(`${series._id}`, { seasons: seasonIds, episodes: episodeIds }));
        });
    });
  }
  
  static findSeriesById(id: string): Promise<Series> {
    return new Promise((resolve, reject) => {
      SeriesModel.findById(id, (err: Error | null, result: Series) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }

  static findSeriesByIdAndUpdate(id: string, data: object): Promise<Series> {
    return new Promise((resolve, reject) => {
      SeriesModel.findByIdAndUpdate(id, data, (err: Error | null, result: Series) => {
        if (err) return reject(err);

        resolve(result);
      }).setOptions({ returnDocument: "after" });
    });
  }

  static findSeriesByIds(ids: string[]): Promise<Series[]> {
    return SeriesModel.find({ _id: ids }).exec();
  }

  static findSeriesByName(name: string): Promise<Series[]> {
    return SeriesModel.find({ name }).exec();
  }

  static findSeriesByEpisode(episode: string): Promise<Series> {
    return new Promise((resolve, reject) => {
      SeriesModel.findOne({ episodes: [episode] }, (err: Error | null, result: Series) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }
}

export default SeriesInterface;
