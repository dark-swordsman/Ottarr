import axios from "axios";
import {
  BannerSize,
  PosterSize
} from "types";

class TMDBInterface {
  static searchForTVShow(query: string): Promise<object> {
    return new Promise((resolve, reject) => {
      axios(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_KEY}&query=${query}`)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  }

  static searchForMovie(query: string): Promise<{ [key: string]: any }> {
    return new Promise((resolve, reject) => {
      axios(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${query}`)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  }

  static searchForMovieAndTVShow(query: string): Promise<{ [key: string]: any }> {
    return new Promise(async (resolve, reject) => {
      const tv = await this.searchForTVShow(query).catch((err) => reject(err));
      const movie = await this.searchForMovie(query).catch((err) => reject(err));

      resolve({ tv, movie });
    });
  }

  static getTVShowInfo(id: string): Promise<{ [key: string]: any }> {
    return new Promise((resolve, reject) => {
      axios(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_KEY}`)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  }

  static getSeasonInfo(id: string, seasonNumber: number): Promise<{ [key: string]: any }> {
    return new Promise((resolve, reject) => {
      axios(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${process.env.TMDB_KEY}`)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  }

  static getMovieInfo(id: string): Promise<{ [key: string]: any }> {
    return new Promise((resolve, reject) => {
      axios(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  }

  static getImage(imageName: string, imageSize: PosterSize | BannerSize): Promise<{ contentType: string, data: any }> {
    return new Promise((resolve, reject) => {
      console.log(`https://image.tmdb.org/t/p/${imageSize}/${imageName}`)
      axios(`https://image.tmdb.org/t/p/${imageSize}/${imageName}`, { responseType: "arraybuffer" })
        .then((response) => {
          resolve({
            contentType: response.headers["content-type"],
            data: response.data
          });
        })
        .catch((err) => reject(err));
    });
  }
}

export default TMDBInterface;