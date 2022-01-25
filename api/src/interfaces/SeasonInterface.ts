import SeasonModel, { Season } from "../models/SeasonModel";

class SeasonInterface {
  static createSeason(data: Season): Promise<Season> {
    return SeasonModel.create(data);
  }

  static findSeasons(data: object): Promise<Season[]> {
    return SeasonModel.find(data).exec();
  }

  static findSeasonById(id: string): Promise<Season> {
    return new Promise((resolve, reject) => {
      SeasonModel.findById(id, (err: Error | null, result: Season) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }
}

export default SeasonInterface;
