import classNames from "classnames";
import { useState } from "react";

export default function SeasonList({ season, episodes }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function renderEpisodes() {
    return episodes.map((episode) => {
      return (
        <tr className="bg-gray-700 text-white">
          <td className="py-1 px-8 w-12">{episode.number}</td>
          <td className="py-1 px-8">{episode.name}</td>
        </tr>
      );
    });
  }

  function renderTable() {
    return (
      <div
        className={classNames(
          "overflow-hidden border-b border-gray-500 duration-500 rounded-b-lg",
          // prettier-ignore
          { "hidden": !isExpanded }
        )}
      >
        <table className="w-full duration-[400ms]">
          <tbody className="divide-y divide-gray-500">{renderEpisodes()}</tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="mb-5 select-none">
      <div
        className={classNames(
          "bg-slate-800 text-white px-10 py-3 border border-slate-900 cursor-pointer duration-500 active:bg-slate-700",
          {
            "rounded-t-xl": isExpanded,
            "rounded-xl": !isExpanded,
          }
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          {season.number === 0 ? "Specials" : `Season ${season.number}`}
        </div>
      </div>
      {renderTable()}
    </div>
  );
}
