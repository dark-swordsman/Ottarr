import { useEffect, useState } from "react";

import {
  DirectoryTable,
  FileTable,
  Layout
} from "../components";

import { clamp } from "../helpers";
import API from "../helpers/API/API";

export default function FileManagement() {
  const [directories, setDirectories] = useState([]);
  const [pageDirectories, setPageDirectories] = useState([]);
  const [pageData, setPageData] = useState({ currentPage: 0, totalPages: 0 });
  const [currentDirectory, setCurrentDirectory] = useState({});
  const [files, setFiles] = useState([]);

  useEffect(async () => {
    const data = await API.mediadirectory.getDirectories();
    const fullData = [...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data];

    setPageData({ currentPage: 1, totalPages: Math.ceil(fullData.length / 4) });
    setPageDirectories(fullData.slice(0, 4));
    setDirectories(fullData);
  }, []);

  function handlePage(pageUp) {
    const { currentPage, totalPages } = pageData;

    let newPage = clamp(currentPage + (pageUp ? 1 : -1), 1, totalPages);

    const startIndex = 4 * (newPage - 1);

    setPageData({ ...pageData, currentPage: newPage });
    setPageDirectories(directories.slice(startIndex, startIndex + 4));
  }

  function handleCurrentDirectory(index) {
    API.file.readDirectory(directories[index].directory)
      .then((result) => {
        setFiles(result.files);
      });

    setCurrentDirectory({ directory: directories[index].directory, index });
  }

  return (
    <Layout title="File Management">
      <div className="mx-24 mt-12">
        <DirectoryTable state={{ directories, pageDirectories, pageData }} methods={{ handleCurrentDirectory, handlePage }} />
        <FileTable files={files} currentDirectory={currentDirectory} />
      </div>
    </Layout>
  );
}