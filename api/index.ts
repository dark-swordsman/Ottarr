import dotenv from "dotenv";
import { diff } from "json-diff";
import { ReadDirectory } from "./helpers/ReadDirectory";

dotenv.config();

let lastDirectory;

setInterval(async () => {
    const newDirectory = await ReadDirectory(process.env.DIRECTORY);
    if (lastDirectory) console.log(diff(lastDirectory, newDirectory));
    lastDirectory = newDirectory;
}, 1000 * 3);
