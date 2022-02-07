import classNames from "classnames";
import { useState } from "react";
import { FileManagement, Overview } from "./Pages";

export default function Tabs({ series, seasons, episodes }) {
  const [page, setPage] = useState(0);

  function renderPages() {
    return [<Overview />, <FileManagement seasons={seasons} episodes={episodes} />][page];
  }

  function renderNavOptions() {
    const options = ["Overview", "File Management"];

    return options.map((name, index) => navOption({ name, index }));
  }

  function navOption({ name, index }) {
    return (
      <div
        onClick={() => setPage(index)}
        className={classNames(
          "duration-100 border-transparent cursor-pointer text-gray-200 hover:text-gray-300 hover:border-indigo-700 pt-4 pb-3 px-1 border-b-4 font-medium",
          { "border-indigo-700": page === index }
        )}
      >
        <span className="px-8">{name}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden mt-12 rounded-md min-h-[36rem] mb-36">
      <div className="border-b border-gray-700 bg-gray-900 px-12">
        <nav class="4 flex space-x-8" aria-label="Tabs">
          {renderNavOptions()}
        </nav>
      </div>
      <div className="bg-gray-800 flex flex-1 w-full self-auto overflow-hidden">{renderPages()}</div>
    </div>
  );
}
