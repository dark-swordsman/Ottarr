import SeriesModel, { ISeries } from "../models/SeriesModel";
import { Episode } from "../models/EpisodeModel";
import { Season } from "../models/SeasonModel";

import SeasonInterface from "./SeasonInterface";
import TMDBInterface from "./TMDBInterface";
import EpisodeInterface from "./EpisodeInterface";

class SeriesInterface {
  static createSeries(data: ISeries): Promise<ISeries> {
    return SeriesModel.create(data);
  }

  private static addTVShow(result: { [key: string]: any }): Promise<ISeries> {
    return new Promise(async (resolve, reject) => {
      const seriesData: ISeries = {
        name: result.name,
        originalName: result.original_name ? result.original_name : null,
        description: result.overview ? result.overview : null,
        card: result.poster_path ? result.poster_path.replace(/\//g, "") : null,
        banner: result.backdrop_path ? result.backdrop_path.replace(/\//g, "") : null,
        tmdb_id: result.id,
        type: "tv"
      }

      // create series
      let series: ISeries = await SeriesInterface.createSeries(seriesData);

      let seasons: Array<{ [key: string]: any }> = [];
      let seasonsTMDB: Array<{ [key: string]: any }> = [];
      let episodes: Array<{ [key: string]: any }> = [];

      // await Promise.all makes the rest of the code wait
      // iterate over result seasons and create in db
      await Promise.all(result.seasons.map(async (season: { [key: string]: any }) => {
        const seasonData: Season = {
          name: season.name,
          number: season.season_number,
          series: series._id!,
          card: season.poster_path ? season.poster_path.replace(/\//g, "") : null
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
            card: episode.still_path ? episode.still_path.replace(/\//g, "") : null
          }

          episodes.push(await EpisodeInterface.createEpisode(episodeData));
        }));
      }));

      resolve(series);
    })
  }

  private static addMovie(result: { [key: string]: any }): Promise<ISeries> {
    return new Promise(async (resolve, reject) => {
      const seriesData: ISeries = {
        name: result.title,
        originalName: result.original_title ? result.original_title : null,
        description: result.overview ? result.overview : null,
        card: result.poster_path ? result.poster_path.replace(/\//g, "") : null,
        banner: result.backdrop_path ? result.backdrop_path.replace(/\//g, "") : null,
        tmdb_id: result.id,
        type: "movie"
      }

      // create series
      let series: ISeries = await SeriesInterface.createSeries(seriesData);

      const episodeData: Episode = {
        name: result.title,
        number: 0,
        type: "movie",
        series: series._id!,
        card: result.poster_path ? result.poster_path.replace(/\//g, "") : null
      }

      EpisodeInterface.createEpisode(episodeData).catch((error) => reject(error));

      resolve(series);
    });
  }

  static addNewSeries({ id, type }: { id: string, type: string }): Promise<ISeries> {
    return new Promise((resolve, reject) => {
      if (type === "tv") {
        TMDBInterface.getTVShowInfo(id)
          .then(async (result) => this.addTVShow(result))
          .then((series) => resolve(series))
          .catch((error) => reject(error));
      } else {
        TMDBInterface.getMovieInfo(id)
          .then(async (result) => this.addMovie(result))
          .then((series) => resolve(series))
          .catch((error) => reject(error));
      }
    });
  }

  static findSeries(data: { [key: string]: any }): Promise<ISeries[]> {
    return SeriesModel.find(data).exec();
  }

  static findSeriesById(id: string): Promise<ISeries> {
    return new Promise((resolve, reject) => {
      SeriesModel.findById(id, (err: Error | null, result: ISeries) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }

  static findSeriesByIdAndUpdate(id: string, data: object): Promise<ISeries> {
    return new Promise((resolve, reject) => {
      SeriesModel.findByIdAndUpdate(id, data, (err: Error | null, result: ISeries) => {
        if (err) return reject(err);

        resolve(result);
      }).setOptions({ returnDocument: "after" });
    });
  }

  static findSeriesByIds(ids: string[]): Promise<ISeries[]> {
    return SeriesModel.find({ _id: ids }).exec();
  }

  static findSeriesByName(name: string): Promise<ISeries[]> {
    return SeriesModel.find({ name }).exec();
  }

  static findSeriesByEpisode(episode: string): Promise<ISeries> {
    return new Promise((resolve, reject) => {
      SeriesModel.findOne({ episodes: [episode] }, (err: Error | null, result: ISeries) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }
}

export default SeriesInterface;
