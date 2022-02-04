import axios from "axios";

export default class Episode {
  static getEpisodesBySeries(seriesId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_HOST}/episode?series=${seriesId}`)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  }
}
