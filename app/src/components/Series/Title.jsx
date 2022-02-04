export default function Title({ cardURL, seriesData }) {
  return (
    <div className="flex grow-0 h-[28rem]">
      <div className="mt-auto w-64 shrink-0">
        <img
          style={{
            filter:
              "drop-shadow(0 0 12px rgb(0 0 0 / 0.4)) drop-shadow(0 0 9px rgb(0 0 0 / 0.7))",
          }}
          className="rounded-xl select-none"
          src={cardURL}
        />
      </div>
      <div className="mt-[6rem] mb-6 ml-12 flex flex-col select-none">
        <span
          style={{
            filter: "drop-shadow(0 0 10px rgb(0 0 0 / 1))",
          }}
          className="text-white text-3xl mb-2 font-semibold"
        >
          {seriesData.name}
        </span>
        {seriesData.originalName ? (
          <span
            style={{
              filter: "drop-shadow(0 0 10px rgb(0 0 0 / 1))",
            }}
            className="text-zinc-300 text-lg font-semibold mb-5"
          >
            {seriesData.originalName}
          </span>
        ) : null}
        <span className="text-white h-64 overflow-hidden">
          <div className="relative w-full">
            <div className="absolute w-full h-64 z-20">
              <div className="h-[60%]" />
              <div className="h-[25%] bg-gradient-to-b from-transparent to-zinc-800" />
              <div className="h-[15%] bg-zinc-800" />
            </div>
          </div>
          <span
            style={{
              filter: "drop-shadow(0 0 10px rgb(0 0 0 / 1))",
            }}
          >
            {seriesData.description}
          </span>
        </span>
      </div>
    </div>
  );
}
