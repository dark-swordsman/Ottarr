import axios from "axios";

export default class MediaDirectory {
  static getDirectories() {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/mediadirectory`)
        .then((response) => resolve(response.data));
    });
  }
}