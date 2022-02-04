import axios from "axios";

export default class TMDB {
  static search(query) {
    return new Promise((resolve, reject) => {
      if (!query) return reject("no query provided");

      axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/tmdb/search?query=${query}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  static getTVShowInfo(id) {
    return new Promise((resolve, reject) => {
      if (!id) return reject("no id provided");

      axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/tmdb/tv/${id}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  static getMovieInfo(id) {
    return new Promise((resolve, reject) => {
      if (!id) return reject("no id provided");

      axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/tmdb/movie/${id}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }
}