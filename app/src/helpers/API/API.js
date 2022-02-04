import Episode from "./routes/Episode";
import File from "./routes/File";
import MediaDirectory from "./routes/MediaDirectory";
import Season from "./routes/Season";
import Series from "./routes/Series";
import TMDB from "./routes/TMDB";

export default class API {
  static episode = Episode;
  static file = File;
  static mediadirectory = MediaDirectory;
  static season = Season;
  static series = Series;
  static tmdb = TMDB;
}
