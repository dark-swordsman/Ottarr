import { Dirent } from "fs";
import fs from "fs/promises";

const customDir: Entity[] = [];

export default async function FileRead() {
    const { DIRECTORY } = process.env;

    console.log(await ReadDirectory(DIRECTORY));
}

async function ReadDirectory(directory: string) {
    const dirContents = await fs.readdir(directory, { withFileTypes: true, recursive: true });;

    return dirContents.map((_de) => createObject(_de, _de.path.split("\\")[_de.path.split("\\").length - 1]));
}

type DE = {
    name: string,
    type: "FILE" | "FOLDER",
    children?: DE[]
}

type Entity = {
    name: string,
    isDir: boolean,
    parent?: string
}

function createObject<Entity>(DirectoryObject: Dirent, parent?: string) {
    // will replace with optional parent when using IDs
    return { 
        name: DirectoryObject.name,
        isDir: DirectoryObject.isDirectory(),
        parent: parent
    };
}

// maybe do JSON object for initial directory structure