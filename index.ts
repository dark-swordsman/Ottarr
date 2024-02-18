import dotenv from "dotenv";
import { diffString } from "json-diff";
import { ReadDirectory } from "./helpers/ReadDirectory";

dotenv.config();

let lastDirectory;

setInterval(async () => {
    const newDirectory = await ReadDirectory(process.env.DIRECTORY);
    if (lastDirectory) console.log(diffString(lastDirectory, newDirectory));
    lastDirectory = newDirectory;
}, 1000 * 5);
