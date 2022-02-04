import classNames from "classnames";

export default function SeriesCard({ series, handleOnClick }) {
  function parseBackgroundURL() {
    const seriesImagePath = series.poster_path.replace(/\//g, "");
    return `url(${process.env.NEXT_PUBLIC_API_HOST}/tmdb/image/poster/${seriesImagePath}?imageSize=w342)`;
  }

  return (
    <div
      style={{
        backgroundImage: series.poster_path ? parseBackgroundURL() : "none",
      }}
      className="relative duration-75 h-80 bg-slate-800 rounded-xl text-center overflow-hidden bg-no-repeat bg-[length:100%] bg-center select-none hover:cursor-pointer hover:opacity-80 hover:bg-[length:105%]"
      onClick={() => handleOnClick(series)}
    >
      <div
        className={classNames(
          "absolute top-0 right-0 px-3 text-white text-lg font-semibold rounded-bl-xl bg-gradient-to-r",
          {
            "from-green-500 to-green-700": series.type === "tv",
            "from-orange-500 to-orange-700": series.type === "movie",
          }
        )}
      >
        {series.type === "tv" ? "TV" : "MOVIE"}
      </div>
      <div className="h-1/3 w-full" />
      {/* REPLACE LATER WITH TAGS OR SOMETHING IDK */}
      <div className="h-1/2 w-full bg-gradient-to-b from-transparent to-black pt-2 flex justify-center">
        <div className="px-2 mt-auto -mb-6">
          <span className="text-2xl font-semibold text-white">
            {series.name ?? series.title}
          </span>
        </div>
      </div>
      <div className="h-1/6 w-full bg-black" />
    </div>
  );
}
