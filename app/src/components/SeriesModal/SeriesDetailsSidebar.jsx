export default function SeriesDetailsSidebar({ seriesDetails }) {
  const { seasons } = seriesDetails;

  const episodeCount = seasons.reduce(findNormalSeasons, 0);

  const seasonCount =
    seasons[0].season_number === 0
      ? `${seasons.length - 1} + Specials`
      : seasons.length;

  function findNormalSeasons(prev, { season_number, episode_count }) {
    return season_number !== 0 ? prev + episode_count : prev;
  }

  function renderSpecials({ season_number, episode_count }) {
    if (season_number === 0) return <div>Specials: {episode_count}</div>;
    return null;
  }

  return (
    <div className="py-3 px-5 leading-7">
      <div>Episodes: {episodeCount}</div>
      {renderSpecials(seasons[0])}
      <div>Seasons: {seasonCount}</div>
    </div>
  );
}
