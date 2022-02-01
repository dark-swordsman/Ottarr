import axios from "axios";

export default class TMDB {
  static search(query) {
    return new Promise(async (resolve, reject) => {
      if (!query) return reject("no query provided");

      axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/tmdb/search?query=${query}`)
        .then((response) => resolve(response.data));
    });
  }
}