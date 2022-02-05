import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../components";
import { Banner, SeasonList, Title } from "../../components/Series";
import API from "../../helpers/API/API";

export default function Series() {
  // back button
  // top bar for functions
  // series info
  // hardlink/file section
  const [seriesData, setSeriesData] = useState({});
  const [seasonData, setSeasonData] = useState([]);
  const [episodeData, setEpisodeData] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  const cardURL = `${process.env.NEXT_PUBLIC_API_HOST}/tmdb/image/poster/${seriesData.card}?imageSize=w500`;
  const bannerURL = `${process.env.NEXT_PUBLIC_API_HOST}/tmdb/image/poster/${seriesData.banner}?imageSize=original`;

  useEffect(() => {
    if (router.isReady) {
      API.series
        .getSeries(id)
        .then((result) => setSeriesData(result))
        .catch((err) => console.error(err));

      API.season
        .getSeasonsBySeries(id)
        .then((result) => setSeasonData(result))
        .catch((err) => console.error(err));

      API.episode
        .getEpisodesBySeries(id)
        .then((result) => setEpisodeData(result))
        .catch((err) => console.error(err));
    }
  }, [router.isReady]);

  useEffect(() => {
    console.log(seriesData);
    console.log(seasonData);
    console.log(episodeData);
  }, [seriesData, seasonData, episodeData]);

  function renderSeasonList({ season, i }) {
    let episodes = [];

    episodeData.forEach((episode) => {
      if (episode.season === season._id) return episodes.push(episode);
    });

    episodes.sort((a, b) => a.number - b.number);

    return <SeasonList key={`season-${i}`} season={season} episodes={episodes} />;
  }

  function renderSeasons() {
    const seasons = [...seasonData];

    seasons.sort((a, b) => a.number - b.number);
    if (seasons[0].number === 0) seasons.push(seasons.shift()); // move specials to bottom

    console.log(seasons);

    if (episodeData.length > 0 && seasonData.length > 0) {
      return seasons.map((season, i) => renderSeasonList({ season, i }));
    }
  }

  if (Object.keys(seriesData).length === 0 || episodeData.length === 0) {
    return (
      <Layout>
        <div className="w-full h-full bg-slate-800">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout title={seriesData.name ? seriesData.name : "loading..."}>
      <div className="w-full min-h-full bg-zinc-800 justify-center flex relative">
        <Banner bannerURL={bannerURL} />
        <div className="z-10 container mx-auto px-8 sm:px-12 lg:px-16">
          <Title cardURL={cardURL} seriesData={seriesData} />
          <div className="mt-12">{renderSeasons()}</div>
        </div>
      </div>
    </Layout>
  );
}
