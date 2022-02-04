import axios from "axios";

export default class Series {
  static createSeries({ tmdb_id, type }) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/series/`, { tmdb_id, type })
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  }

  static getAllSeries() {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/series/`)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  }

  static getSeries(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/series/${id}`)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  }
}