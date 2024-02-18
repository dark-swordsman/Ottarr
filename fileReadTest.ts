import strict from "assert/strict";
import { Dirent } from "fs";
import fs from "fs/promises";

const customDir = {};

export default async function FileRead() {
    const { DIRECTORY } = process.env;

    console.log(await ReadDirectory(DIRECTORY));
}

async function ReadDirectory(directory: string) {
    console.log("\n--- READING DIRECTORY ---\n")
    const dirContents = await fs.readdir(directory, { withFileTypes: true, recursive: true });

    dirContents.forEach((dirent) => {
        const pathSplit = dirent.path.split("\\");

        if (pathSplit.length > 1) {
            createChildObject(dirent, pathSplit);
        } else {
            customDir[dirent.name] = createObject(dirent.name, dirent.isDirectory());
        }
    });

    await fs.writeFile(`./jsonOutput/testout.json`, JSON.stringify(customDir, null, 2));
}

function createChildObject(dirent: Dirent, pathSplit: string[]) {
    let currentDir;

    pathSplit.forEach((str, i) => {
        if (i == 0) return currentDir = customDir;
        if (currentDir[str]) currentDir = currentDir[str].children;
        currentDir[dirent.name] = createObject(dirent.name, dirent.isDirectory());
    });
}

function createObject(name: string, dir: boolean): DirectoryEntity {
    // will replace with optional parent when using IDs
    if (dir) {
        return { 
            name: name,
            type: DirectoryEntityType.FOLDER,
            children: {}
        }
    } else {
        return { 
            name: name,
            type: DirectoryEntityType.FILE
        };
    }
}

enum DirectoryEntityType {
    "FILE",
    "FOLDER"
}

type DirectoryEntity = {
    name: string,
    type: DirectoryEntityType,
    children?: {}
}

type Entity = {
    name: string,
    isDir: boolean,
    parent?: string
}

/*
    read objects
    if folder, find any objets with parent
    recursive
*/