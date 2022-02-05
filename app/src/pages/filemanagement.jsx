import { useEffect, useState } from "react";

import { DirectoryTable, FileManagement, Layout } from "../components";

import { clamp } from "../helpers";
import API from "../helpers/API/API";

export default function FileManagementPage() {
  const [directories, setDirectories] = useState([]);
  const [pageDirectories, setPageDirectories] = useState([]);
  const [pageData, setPageData] = useState({ currentPage: 0, totalPages: 0 });
  const [baseDirectory, setBaseDirectory] = useState("");
  const [currentDirectory, setCurrentDirectory] = useState("");

  useEffect(async () => {
    const data = await API.mediadirectory.getDirectories();

    setPageData({ currentPage: 1, totalPages: Math.ceil(data.length / 4) });
    setPageDirectories(data.slice(0, 4));
    setDirectories(data);
  }, []);

  function handlePage(pageUp) {
    const { currentPage, totalPages } = pageData;

    let newPage = clamp(currentPage + (pageUp ? 1 : -1), 1, totalPages);

    const startIndex = 4 * (newPage - 1);

    setPageData({ ...pageData, currentPage: newPage });
    setPageDirectories(directories.slice(startIndex, startIndex + 4));
  }

  function handleCurrentDirectory(index) {
    setBaseDirectory(directories[index].directory);
    setCurrentDirectory(directories[index].directory);
  }

  return (
    <Layout title="File Management">
      <div className="pt-12 flex justify-center">
        <div className="w-11/12">
          <DirectoryTable state={{ directories, pageDirectories, pageData }} methods={{ handleCurrentDirectory, handlePage }} />
          <FileManagement currentDirectory={currentDirectory} setCurrentDirectory={setCurrentDirectory} baseDirectory={baseDirectory} />
        </div>
      </div>
    </Layout>
  );
}
