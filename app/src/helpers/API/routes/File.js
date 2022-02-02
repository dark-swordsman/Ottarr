import axios from "axios";

export default class File {
  static readDirectory(path) {
    return new Promise((resolve, reject) => {
      if (!path) return reject("please provide a path");

      axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/file?path=${path}`)
        .then((response) => resolve(response.data));
    });
  }
}