export default function AddSeriesModal({ series, isShown, passedRef }) {
  return (
    <div 
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", transition: "visibility 0.075s, opacity 0.075s linear", opacity: isShown ? 1 : 0, visibility: isShown ? "visible" : "hidden" }} 
      className="absolute w-full h-full z-10 top-0 left-0 flex"
    >
      <div ref={passedRef} style={{ filter: "drop-shadow(0 20px 50px rgb(0 0 0 / 0.7))"}} className="rounded-xl h-2/3 w-1/2 min-h-[32rem] min-w-[38rem] m-auto bg-slate-700 text-white align-middle p-8 flex">
        <div className="shrink-0">
          <img 
            src={`${process.env.NEXT_PUBLIC_API_HOST}/tmdb/image${series.poster_path}`}
            className="h-80 rounded-lg"
          />
        </div>
        <div className="ml-10">
          <div className="font-bold text-4xl mb-6 mt-2">{series.name ?? series.title}</div>
          <div>{series.overview}</div>
        </div>
      </div>
    </div>
  );
}