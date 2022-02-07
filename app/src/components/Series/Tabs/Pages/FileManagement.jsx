import classNames from "classnames";
import { useEffect, useState } from "react";

export default function FileManagement({ seasons, episodes }) {
  const [sortedSeasons, setSortedSeasons] = useState([...seasons]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const tempSortedSeasons = [...sortedSeasons];

    tempSortedSeasons.sort((a, b) => a.number - b.number);
    tempSortedSeasons.push(tempSortedSeasons.shift());

    tempSortedSeasons.forEach((season) => {
      season.episodes = episodes.reduce((prev, current) => (current.season === season._id ? [...prev, current] : prev), []);
    });

    setSortedSeasons(tempSortedSeasons);
  }, []);

  function seasonTab({ season, index }) {
    return (
      <div
        onClick={() => setActiveTab(index)}
        className={classNames("flex flex-grow hover:bg-gray-700 select-none active:bg-gray-800 cursor-pointer text-gray-300", {
          "bg-gray-700": index === activeTab,
        })}
      >
        <span className={classNames("py-2 px-8", { "border-l-4 border-indigo-800": index === activeTab })}>
          {season.number > 0 ? `Season ${season.number}` : "Specials"}
        </span>
      </div>
    );
  }

  function renderSeasonTabs() {
    return sortedSeasons.map((season, i) => {
      return seasonTab({ season, index: i });
    });
  }

  function renderEpisodes() {
    return seasons[activeTab].episodes.map((episode) => {
      return (
        <tr className="bg-zinc-700">
          <td className="text-center">{episode.number}</td>
          <td className="pl-6">{episode.name}</td>
        </tr>
      );
    });
  }

  return (
    <div className="flex-1 flex">
      <div className="flex shrink-0 w-[12rem] overflow-y-auto h-full pt-5 pb-4 bg-gray-900">
        <div className="w-full flex-1">{renderSeasonTabs()}</div>
      </div>
      <table className="w-full flex-1 text-white overflow-y-[overlay]">
        <thead>
          <tr className="bg-zinc-800">
            <td className="w-16 text-center py-1">#</td>
            <td className="pl-6">Name</td>
          </tr>
        </thead>
        <tbody>{seasons[activeTab].episodes ? renderEpisodes() : null}</tbody>
      </table>
    </div>
  );
}
