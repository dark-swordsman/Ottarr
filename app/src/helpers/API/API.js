import File from "./routes/File";
import MediaDirectory from "./routes/MediaDirectory";
import TMDB from "./routes/TMDB";

export default class API {
  static file = File;
  static mediadirectory = MediaDirectory;
  static tmdb = TMDB;
}