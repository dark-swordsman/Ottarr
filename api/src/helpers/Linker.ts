import fs, { PathLike } from "fs";
import LinkInterface from "../interfaces/LinkInterface";
import { Link } from "../models/LinkModel";
import { MediaDirectory } from "../models/MediaDirectoryModel";

class Linker {
  static link({
    originalDirectory,
    originalSubDirectory,
    linkedDirectory,
    linkedSubDirectory,
    file,
  }: {
    originalDirectory: MediaDirectory;
    originalSubDirectory: string;
    linkedDirectory: MediaDirectory;
    linkedSubDirectory: string;
    file: string;
  }): Promise<Link> {
    return new Promise((resolve, reject) => {
      fs.link(
        `${originalDirectory.directory}${originalSubDirectory ? `/${originalSubDirectory}` : ""}/${file}`,
        `${linkedDirectory.directory}${linkedSubDirectory ? `/${linkedSubDirectory}` : ""}/${file}`,
        (err) => {
          if (err) return reject(err);

          resolve({
            priority: 0,
            originalDirectory,
            originalSubDirectory,
            originalFile: file,
            linkedDirectory,
            linkedSubDirectory,
            linkedFile: file,
          });
        }
      );
    });
  }

  static readDirectory(dirPath: PathLike): Promise<string[]> {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(dirPath)) {
        if (fs.lstatSync(dirPath).isDirectory()) {
          try {
            const directoryObject: string[] = fs.readdirSync(dirPath);
            resolve(directoryObject);
          } catch (err) {
            return reject(err);
          }
        } else {
          reject("Path is not a directory.");
        }
        reject("Directory does not exist.");
      }
    });
  }

  static createLinks({
    originalDirectory,
    linkedDirectory,
    originalSubDirectory,
    linkedSubDirectory,
  }: {
    originalDirectory: MediaDirectory;
    linkedDirectory: MediaDirectory;
    originalSubDirectory?: string;
    linkedSubDirectory?: string;
  }): Promise<boolean | string> {
    return new Promise((resolve, reject) => {
      this.readDirectory(originalDirectory.directory.toString() + (originalSubDirectory ? `/${originalSubDirectory}` : ""))
        .then((directoryObjects: string[]) => {
          directoryObjects.forEach((directoryObject: string) => {
            const oldDir = `${originalDirectory.directory}/${originalSubDirectory ? originalSubDirectory + "/" : ""}${directoryObject}`;
            const newDir = `${linkedDirectory.directory}/${linkedSubDirectory ? linkedSubDirectory + "/" : ""}${directoryObject}`;

            if (fs.existsSync(oldDir) && fs.lstatSync(oldDir).isDirectory()) {
              if (!fs.existsSync(newDir)) fs.mkdirSync(newDir);
              this.createLinks({
                originalDirectory,
                linkedDirectory,
                originalSubDirectory: `${originalSubDirectory ? `${originalSubDirectory}/` : ""}${directoryObject}`,
                linkedSubDirectory: `${linkedSubDirectory ? `${linkedSubDirectory}/` : ""}${directoryObject}`,
              });
            } else {
              if (fs.existsSync(newDir)) return resolve("Link already exists");

              this.link({
                originalDirectory,
                originalSubDirectory: `${originalSubDirectory ?? ""}`,
                linkedDirectory,
                linkedSubDirectory: `${linkedSubDirectory ?? ""}`,
                file: directoryObject,
              })
                .then((returnedLink) => {
                  LinkInterface.createLinkAndSave(returnedLink).then((result) => resolve(true));
                })
                .catch((err) => reject(err));
            }
          });
        })
        .catch((err) => reject(err));
    });
  }
}

export default Linker;
