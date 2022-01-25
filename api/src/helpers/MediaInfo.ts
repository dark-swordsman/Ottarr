import { exec } from "child_process";

class MediaInfo {
  static getMediaInfo(directory: string): Promise<object> {
    return new Promise((resolve, reject) => {
      exec(`mediainfo --Output=JSON "${directory}"`, (error: any, stdout: string | Buffer, stderr: string | Buffer) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return reject(error);
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return reject(stderr);
        }
        const regexArray = stdout.toString().match(/\{"media".+\}|\{\r?\n.?"media"[^]+\}/gim);
        if (!regexArray) return reject("stdout was buffer");
        resolve(JSON.parse(regexArray[0]));
      });
    });
  }
}

export default MediaInfo;
