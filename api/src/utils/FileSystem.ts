import fs from "fs";

export default class FileSystem {
  static readDirectory(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readdir(`${path}`, (error: Error | null, files: string[]) => {
        if (error) return reject(error);

        const result = files.map((file: string) => {
          return {
            file,
            isDirectory: fs.lstatSync(`${path}/${file}`).isDirectory()
          };
        });

        resolve(result);
      });
    });
  }
}