import classNames from "classnames";
import { useEffect, useState } from "react";
import API from "../../helpers/API/API";
import DirectoryRow from "./DirectoryRow";

export default function FileRow({ file, originalDirectory, index, depth, filesExist, overrideClick }) {
  const [newFile, setNewFile] = useState({ ...file, files: [] });

  useEffect(() => {
    setNewFile({ ...file, files: [] });
  }, [file]);

  function createDirectorySpacing() {
    let spacing = "";

    if (depth > 0) {
      for (let i = 0; i < depth; i++) {
        spacing += "|\xa0\xa0";
      }
    }

    return spacing;
  }

  function getDirectory() {
    API.file
      .readDirectory(`${originalDirectory}/${newFile.file}`)
      .then((result) => setNewFile({ ...newFile, files: result.files }))
      .catch((err) => console.error(err));
  }

  function handleClick() {
    if (newFile.files.length > 0) {
      const tempFile = { ...newFile };
      tempFile.files = [];
      setNewFile(tempFile);
    } else {
      getDirectory();
    }
  }

  function determineClick() {
    if (overrideClick) return overrideClick(file.file);
    if (newFile.isDirectory) handleClick();
  }

  if (newFile && newFile.file) {
    let rows = [];

    rows.push(
      <tr key={index}>
        <td
          onClick={file.isDirectory ? () => determineClick() : null}
          className={classNames(`px-[1rem] whitespace-nowrap tracking-wider hover:bg-zinc-600`, {
            "text-blue-300 hover:text-blue-400 cursor-pointer": newFile.isDirectory,
            "pt-1": index === 0,
          })}
        >
          {createDirectorySpacing()}
          {newFile.isDirectory ? `> ${newFile.file}/` : newFile.file}
        </td>
      </tr>
    );

    if (newFile.files && newFile.files.length > 0) {
      rows.push(
        <tr key={`dir-${index}`}>
          <td>
            <DirectoryRow directory={newFile.files} originalDirectory={originalDirectory} newFile={newFile} depth={depth} />
          </td>
        </tr>
      );
    }

    return rows;
  }

  // on click handler, includes request to API for directory
  // use state in parent to determine opened directories
  // add logic here for isDirectory to render children recursively

  return (
    <tr key={`file-${index}`}>
      <td className="px-4 whitespace-nowrap tracking-wider">{filesExist ? <div className="h-3" /> : "No files..."}</td>
    </tr>
  );
}
