import { Dirent } from "fs";
import fs from "fs/promises";

let _customDir = {};
let directoryElements = 0;
const time = {
    start: 0,
    end: 0
}

export async function FileReadTest(writeTest: boolean) {
    const { DIRECTORY } = process.env;
    if (writeTest) {
        for (let i = 0; i < 200; i++) {
            const datenowbleh = Math.random() * Date.now();
            fs.mkdir(`.testData/folder${datenowbleh}`);
            for (let i = 0; i < parseInt(`${(Math.random() * 12) + 12}`); i++) {
                await fs.writeFile(`.testData/folder${datenowbleh}/file-${Math.random() * Date.now()}.json`, JSON.stringify({ "test": "test" }, null, 2));
            }
        }
    } else {
        ReadDirectory(DIRECTORY);
    }
}

export async function ReadDirectory(directory: string) {
    console.log("\n--- READING DIRECTORY ---");
    const start = process.hrtime();
    time.start = start[0] * 1000000 + start[1] / 1000;

    const dirContents = await fs.readdir(directory, { withFileTypes: true, recursive: true });

    dirContents.forEach((dirent) => {
        directoryElements++;
        const pathSplit = dirent.path.split("\\");

        if (pathSplit.length > 1) {
            createChildObject(dirent, pathSplit);
        } else {
            _customDir[dirent.name] = createObject(dirent.name, dirent.isDirectory());
        }
    });
    
    // await fs.writeFile(`./jsonOutput/testout.json`, JSON.stringify(customDir, null, 2));
    
    const end = process.hrtime();
    time.end = end[0] * 1000000 + end[1] / 1000;
    console.log(`Took ${((time.end - time.start) / 1000).toLocaleString(undefined, { minimumFractionDigits: 3 })} ms to process ${directoryElements} elements.`);
    
    const customDir = _customDir;
    _customDir = {};
    directoryElements = 0;
    return customDir;
}

function createChildObject(dirent: Dirent, pathSplit: string[]) {
    let currentDir;

    pathSplit.forEach((str, i) => {
        if (i == 0) return currentDir = _customDir;
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