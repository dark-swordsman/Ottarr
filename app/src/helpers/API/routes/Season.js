import axios from "axios";

export default class Season {
  static getSeasonsBySeries(seriesId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_HOST}/season?series=${seriesId}`)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  }
}
