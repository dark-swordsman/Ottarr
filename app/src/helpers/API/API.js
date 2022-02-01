import TMDB from "./routes/TMDB";
import MediaDirectory from "./routes/MediaDirectory";

export default class API {
  static tmdb = TMDB;
  static mediadirectory = MediaDirectory;
}