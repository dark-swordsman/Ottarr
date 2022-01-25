import QualityModel, { Quality } from "../models/QualityModel";

class QualityInterface {
  static createQualityAndSave(data: Quality): Promise<Quality> {
    return QualityModel.create(data);
  }

  static findAllQuality(): Promise<Quality[]> {
    return QualityModel.find({}).exec();
  }

  static findQualityByName(name: string): Promise<Quality | Error> {
    return new Promise((resolve, reject) => {
      QualityModel.findOne({ name }, (err: Error | null, result: Quality) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }

  static findQualityByTag(tag: string): Promise<Quality | Error> {
    return new Promise((resolve, reject) => {
      QualityModel.findOne({ tag }, (err: Error | null, result: Quality) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }
}

export default QualityInterface;
