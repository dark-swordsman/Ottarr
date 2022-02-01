export default function SeriesCard({ series, handleOnClick }) {
  return (
    <div 
      style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_API_HOST}/tmdb/image${series.poster_path})` }}
      className="duration-75 h-80 bg-slate-800 rounded-xl text-center overflow-hidden bg-[length:100%_100%] bg-center select-none hover:cursor-pointer hover:opacity-80 hover:bg-[length:105%_105%]"
      onClick={() => handleOnClick(series)}
    >
      <div className="h-1/3 w-full" />
      {/* REPLACE LATER WITH TAGS OR SOMETHING IDK */}
      <div className="h-1/2 w-full bg-gradient-to-b from-transparent to-black pt-2 flex justify-center">
        <div className="px-2 mt-auto -mb-6">
          <span className="text-2xl font-semibold text-white">{series.name ?? series.title}</span>
        </div>
      </div>
      <div className="h-1/6 w-full bg-black" />
    </div>
  );
}