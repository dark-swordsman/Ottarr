import { useEffect, useState } from "react";
import API from "../../helpers/API/API";
import SeriesDetailsSidebar from "./SeriesDetailsSidebar";

export default function SeriesModal({ series, isShown, passedRef }) {
  const [seriesDetails, setSeriesDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const cardURL = `${process.env.NEXT_PUBLIC_API_HOST}/tmdb/image/poster/${series.poster_path}?imageSize=w342`;

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
          <img src={cardURL} className="h-80 rounded-xl" />
          <div className="bg-slate-500 rounded-xl mt-6 min-h-[5rem] font-semibold">
            {seasons && Object.keys(seriesDetails).length > 0 ? (
              <SeriesDetailsSidebar seriesDetails={seriesDetails} />
            ) : null}
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
        </div>
      </div>
    </div>
  );
}
