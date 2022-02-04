import { useEffect, useState } from "react";
import API from "../../helpers/API/API";

export default function AddSeriesModal({ series, isShown, passedRef }) {
  const [seriesDetails, setSeriesDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function posterURL() {
    if (series.poster_path) {
      const posterFileName = series.poster_path.replace(/\//g, "");
      return `${process.env.NEXT_PUBLIC_API_HOST}/tmdb/image/poster/${posterFileName}?imageSize=w342`;
    }

    return null;
  }

  useEffect(() => {
    setSeriesDetails({});
    if (series.type === "tv") {
      API.tmdb
        .getTVShowInfo(series.id)
        .then((result) => setSeriesDetails(result));
    } else {
      API.tmdb
        .getMovieInfo(series.id)
        .then((result) => setSeriesDetails(result));
    }

    return () => setSeriesDetails({});
  }, [series]);

  function handleAddSeries() {
    setIsLoading(true);
    API.series
      .createSeries({ tmdb_id: series.id, type: series.type })
      .then((result) => {
        setIsLoading(false);
        console.log(result);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        transition: "visibility 0.075s, opacity 0.075s linear",
        opacity: isShown ? 1 : 0,
        visibility: isShown ? "visible" : "hidden",
      }}
      className="absolute w-full h-full z-10 top-0 left-0 flex"
    >
      <div
        ref={passedRef}
        style={{ filter: "drop-shadow(0 20px 50px rgb(0 0 0 / 0.7))" }}
        className="rounded-xl h-2/3 w-1/2 min-h-[32rem] min-w-[38rem] m-auto bg-slate-700 text-white align-middle p-8 flex"
      >
        <div className="shrink-0">
          <img src={posterURL()} className="h-80 rounded-xl" />
          <div className="bg-slate-500 rounded-xl mt-6 min-h-[5rem] font-semibold">
            {seriesDetails.seasons && Object.keys(seriesDetails).length > 0 && (
              <div className="py-3 px-5 leading-7">
                <div>
                  Episodes:{" "}
                  {seriesDetails.seasons.reduce(
                    (prev, current) =>
                      current.season_number !== 0
                        ? prev + current.episode_count
                        : prev,
                    0
                  )}
                </div>
                {seriesDetails.seasons[0].season_number === 0 ? (
                  <div>Specials: {seriesDetails.seasons[0].episode_count}</div>
                ) : (
                  ""
                )}
                <div>
                  Seasons:{" "}
                  {seriesDetails.seasons[0].season_number === 0
                    ? `${seriesDetails.seasons.length - 1} + Specials`
                    : seriesDetails.seasons.length}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="ml-10 flex flex-col">
          <div className="flex-1">
            <div className="mb-4">
              <div className="font-bold text-4xl">
                {series.name ?? series.title}
              </div>
              {series.original_language !== "en" ? (
                <div className="font-semibold opacity-30 text-xl mt-2 text-zinc-200">
                  {series.type === "tv"
                    ? series.original_name
                    : series.original_title}
                </div>
              ) : null}
            </div>
            <div className="max-h-[16rem] text-clip overflow-hidden relative">
              {series.overview}
              <div className="z-10 absolute top-40 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-slate-700" />
              <div className="z-11 absolute top-40 opacity-80 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-slate-700" />
            </div>
          </div>
          <button
            onClick={() => handleAddSeries()}
            disabled={isLoading}
            className="inital self-end bg-emerald-600 duration-75 px-4 py-2 rounded-xl hover:bg-emerald-700 active:bg-emerald-500"
          >
            {isLoading ? "loading..." : "Add Series"}
          </button>
        </div>
      </div>
    </div>
  );
}
