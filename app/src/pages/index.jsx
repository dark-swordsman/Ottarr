import { useEffect, useState } from "react";
import { Layout, Link, SeriesCard } from "../components";
import API from "../helpers/API/API";

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.series
      .getAllSeries()
      .then((result) => {
        setIsLoading(false);
        setData(result);
      })
      .catch((error) => console.error(error));
  }, []);

  function renderSeries() {
    if (isLoading)
      return <div className="text-4xl text-white mt-12">Loading...</div>;

    if (data.length > 0) {
      return (
        <div className="w-11/12 mx-auto mt-12 grid justify-between grid-cols-[repeat(auto-fill,14rem)] gap-8">
          {data.map((series, i) => (
            <Link href={`/series/${series._id}`}>
              <SeriesCard
                key={i + "-series"}
                handleOnClick={() => {}}
                series={{ poster_path: series.card, ...series }}
              />
            </Link>
          ))}
        </div>
      );
    } else {
      return (
        <div className="mt-12">
          <div className="text-white text-4xl font-semibold">
            No series found.{" "}
          </div>
          <div className="mt-5">
            <Link extraClasses={"text-2xl"} href="/addseries">
              Add new series
            </Link>
          </div>
        </div>
      );
    }
  }

  return (
    <Layout title="Home">
      <div className="w-full text-center mt-6">{renderSeries()}</div>
    </Layout>
  );
}
