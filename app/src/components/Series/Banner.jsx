export default function Banner({ bannerURL }) {
  return (
    <div className="absolute w-full h-[22rem]">
      <div className="absolute w-full h-[22rem]">
        <div className="z-10 w-full h-2/3 bg-[#18181b80]" />
        <div className="z-10 w-full h-1/3 bg-gradient-to-b from-[#18181b80] to-zinc-800" />
      </div>
      <div
        style={{ backgroundImage: `url(${bannerURL})` }}
        className="w-full h-[22rem]"
      />
    </div>
  );
}
