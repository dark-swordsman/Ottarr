import { useEffect, useState } from "react";
import FileTable from "./FileTable/FileTable";
import API from "../helpers/API/API";

export default function FileManagement({ currentDirectory, setCurrentDirectory, baseDirectory }) {
  const [childDirectories, setChildDirectores] = useState([]);
  const [files, setFiles] = useState([]);
  const [bufferFiles, setBufferFiles] = useState([]);
  const [explorerType, setExplorerType] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(typeof currentDirectory);
    if (currentDirectory && files.length === 0) loadFiles();
  }, [currentDirectory]);

  function loadFiles() {
    setIsLoading(true);
    API.file.readDirectory(currentDirectory).then((result) => {
      setFiles([]); // clear files so expanded components unmount
      setTimeout(() => {
        setFiles(result.files);
        setBufferFiles([result.files]);
        setIsLoading(false);
      }, 5);
    });
  }

  function toggleExplorerType() {
    if (files) {
      const tempBufferFiles = [...bufferFiles];

      setCurrentDirectory(baseDirectory);
      setChildDirectores([]);
      setFiles([]);
      setBufferFiles([]);

      setTimeout(() => {
        setFiles(tempBufferFiles[0]);
        setBufferFiles([tempBufferFiles[0]]);
      }, 5);
    }

    setExplorerType(!explorerType);
  }

  function overrideClick(file) {
    const tempChildDirectories = [...childDirectories];
    const tempBufferFiles = [...bufferFiles];
    const newDirectory = [currentDirectory, file].join("/");

    setIsLoading(true);
    API.file.readDirectory(newDirectory).then((result) => {
      setFiles([]); // clear files so expanded components unmount
      setFiles(result.files);

      tempBufferFiles.push(result.files);
      console.log(tempBufferFiles);
      setBufferFiles(tempBufferFiles);

      setIsLoading(false);
    });

    tempChildDirectories.push(`${file}`);

    setChildDirectores(tempChildDirectories);
    setCurrentDirectory(newDirectory);
  }

  function navigateToParent() {
    console.log(currentDirectory);
    if (baseDirectory !== currentDirectory) {
      let tempChildDirectories = [...childDirectories];
      let tempBufferFiles = [...bufferFiles];

      tempChildDirectories.pop();
      tempBufferFiles.pop();

      setCurrentDirectory(`${baseDirectory}${tempChildDirectories.join("/")}`);
      setChildDirectores(tempChildDirectories);

      console.log(tempBufferFiles);

      setFiles(tempBufferFiles[tempBufferFiles.length - 1]);
      setBufferFiles(tempBufferFiles);
    }
  }

  if (files) {
    return (
      <FileTable
        root={baseDirectory === currentDirectory}
        files={files}
        isLoading={isLoading}
        pageView={{ toggleExplorerType, overrideClick: explorerType ? overrideClick : null, navigateToParent }}
        currentDirectory={currentDirectory}
      />
    );
  }

  return null; // return placeholder
}
