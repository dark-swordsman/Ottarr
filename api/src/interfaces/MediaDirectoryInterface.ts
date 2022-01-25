import { Schema } from "mongoose";
import MediaDirectoryModel, { MediaDirectory } from "../models/MediaDirectoryModel";

class MediaDirectoryInterface {
  static createMediaDirectoryAndSave(data: MediaDirectory): Promise<MediaDirectory | Error> {
    return new Promise((resolve, reject) => {
      MediaDirectoryModel.create(data, (err: Error | null, result: MediaDirectory) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }

  static findAllMediaDirectory(): Promise<MediaDirectory[] | Error> {
    return new Promise((resolve, reject) => {
      MediaDirectoryModel.find({}, (err: Error | null, result: MediaDirectory[]) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }

  static findMediaDirectoryById(id: string): Promise<MediaDirectory | null> {
    return MediaDirectoryModel.findById(id).exec();
  }

  static findMediaDirectoryByIds(ids: string[]): Promise<MediaDirectory[]> {
    return MediaDirectoryModel.find({ _id: ids }).exec();
  }

  static findMediaDirectoryByName(name: string): Promise<MediaDirectory[]> {
    return new Promise((resolve, reject) => {
      MediaDirectoryModel.find(
        {
          name,
        },
        (err: Error | null, result: MediaDirectory[]) => {
          if (err) return reject(err);

          resolve(result);
        }
      );
    });
  }

  static findMediaDirectoryBySource(source: Boolean): Promise<MediaDirectory[]> {
    return new Promise((resolve, reject) => {
      MediaDirectoryModel.find({ source }, (err: Error | null, result: MediaDirectory[]) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }
}

export default MediaDirectoryInterface;
