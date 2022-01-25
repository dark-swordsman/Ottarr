import EpisodeModel, { Episode } from "../models/EpisodeModel";

class EpisodeInterface {
  static createEpisode(data: Episode): Promise<Episode> {
    return EpisodeModel.create(data);
  }

  static findEpisodeById(id: string): Promise<Episode> {
    return new Promise((resolve, reject) => {
      EpisodeModel.findById({ _id: id }, (err: Error | null, result: Episode) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }

  static findEpisodesByIds(ids: string[]): Promise<Episode[]> {
    return EpisodeModel.find({ _id: ids }).exec();
  }

  static findEpisodesBySeries(series: string): Promise<Episode[]> {
    return EpisodeModel.find({ series }).exec();
  }

  static findEpisodesBySeason(season: string): Promise<Episode[]> {
    return EpisodeModel.find({ season }).exec();
  }

  static findEpisodeByTypeAndName({ type, name }: { type: string; name: string }): Promise<Episode> {
    return new Promise((resolve, reject) => {
      EpisodeModel.findOne({ type, name }, (err: Error | null, result: Episode) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }

  static findEpisodeByIdAndUpdate(id: string, data: object): Promise<Episode> {
    return new Promise((resolve, reject) => {
      EpisodeModel.findByIdAndUpdate(id, data, (err: Error | null, result: Episode) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }
}

export default EpisodeInterface;
