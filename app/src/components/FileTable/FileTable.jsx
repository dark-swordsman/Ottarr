import classNames from "classnames";
import { useEffect, useState } from "react";
import FileRow from "./FileRow";

export default function FileTable({ files, currentDirectory, isLoading, root, pageView }) {
  const [workingFiles, setWorkingFiles] = useState([...files]);

  useEffect(() => {
    setWorkingFiles([...files]);
  }, [files]);

  function renderBody() {
    if (workingFiles) {
      return workingFiles.map((file, i) => {
        return (
          <FileRow key={i} overrideClick={pageView.overrideClick} file={file} originalDirectory={currentDirectory} index={i} depth={0} />
        );
      });
    }

    return null;
  }

  function renderButton() {
    return (
      <button
        disabled={root}
        onClick={() => pageView.navigateToParent()}
        className={classNames("rounded-l-lg px-2 border border-zinc-700", {
          "text-gray-400 bg-zinc-600 cursor-not-allowed": root,
          "bg-slate-600 hover:shadow-inner hover:bg-slate-700 duration-75 active:bg-slate-500": !root,
        })}
      >
        {"<-"}
      </button>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl select-none mb-32">
      <table className="min-w-full divide-y divide-gray-300 text-white">
        <thead className="bg-zinc-600">
          <tr>
            <th className="p-2 tracking-wider text-left">
              <div className="flex justify-between">
                <div className="bg-zinc-700 rounded-lg flex max-w-[80%]">
                  {pageView.overrideClick ? renderButton() : null}
                  <div className="px-3 py-1">{currentDirectory ? currentDirectory : "Please Select a Directory..."}</div>
                </div>
                <div className="flex flex-col">
                  <button
                    className={classNames("font-semibold px-3 py-1 rounded-lg", {
                      "bg-blue-600 hover:bg-blue-700 active:bg-blue-500": !pageView.overrideClick,
                      "bg-green-600 hover:bg-green-700 active:bg-green-500": pageView.overrideClick,
                    })}
                    onClick={pageView.toggleExplorerType}
                  >
                    {pageView.overrideClick ? "Toggle Nested View" : "Toggle Page View"}
                  </button>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-zinc-500">
          {isLoading ? (
            <tr>
              <td className="p-6 text-center">Loading...</td>
            </tr>
          ) : (
            renderBody()
          )}
          <FileRow filesExist={workingFiles.length ? true : false} index={-1} />
        </tbody>
      </table>
    </div>
  );
}
