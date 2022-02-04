import { useEffect, useRef, useState } from "react";
import API from "../helpers/API/API";

import { AddSeriesModal, Layout, SeriesCard } from "../components";
import { modalClose } from "../helpers";

export default function AddSeries() {
  const addSeriesRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [lastSearchedQuery, setLastSearchedQuery] = useState("");
  const [enterPressed, setEnterPressed] = useState(false);
  const [_data, _setData] = useState({});
  const [data, setData] = useState([]);
  const [queryTimeout, setQueryTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addSeries, setAddSeries] = useState(false);
  const [currentSeries, setCurrentSeries] = useState({});

  // add listener for enter key to search
  useEffect(
    () => document.addEventListener("keydown", handleSearchEnterKey, false),
    []
  );

  // handle search timing
  useEffect(() => {
    function search() {
      setIsLoading(true);
      setLastSearchedQuery(searchQuery);

      API.tmdb.search(searchQuery).then((responseData) => {
        _setData(responseData);

        clearTimeout(queryTimeout);
        setQueryTimeout(null);
        setIsLoading(false);
        setEnterPressed(false);
      });
    }

    if (searchQuery) {
      if (lastSearchedQuery !== searchQuery) {
        if (enterPressed) {
          clearTimeout(queryTimeout);
          setQueryTimeout(null);

          search();
        } else {
          setQueryTimeout(setTimeout(() => search(), 2000));

          return () => clearTimeout(queryTimeout) && setQueryTimeout(null);
        }
      } else {
        clearTimeout(queryTimeout);
        setQueryTimeout(null);
        setIsLoading(false);
      }
    } else {
      clearTimeout(queryTimeout);
      setIsLoading(false);
      setQueryTimeout(null);
    }
  }, [searchQuery, enterPressed]);

  // filter TMDB query data
  useEffect(async () => {
    if (Object.keys(_data).length > 0) {
      let seriesArray = [];

      await _data.tv.results.forEach((result) =>
        seriesArray.push({ ...result, type: "tv" })
      );
      await _data.movie.results.forEach((result) =>
        seriesArray.push({ ...result, type: "movie" })
      );

      console.log(seriesArray);

      setData(seriesArray);
    }
  }, [_data]);

  // handle close of addseries modal
  useEffect(
    () =>
      modalClose({
        ref: addSeriesRef,
        setState: setAddSeries,
        state: addSeries,
      }),
    [addSeries]
  );

  function handleSearchEnterKey(e) {
    if (e.keyCode === 13) setEnterPressed(true);
  }

  function handleSeriesClick(series) {
    setCurrentSeries(series);
    setAddSeries(true);
  }

  function handleSearchQueryChange(e) {
    setSearchQuery(e.target.value);
    setIsLoading(true);
    setEnterPressed(false);
  }

  // RENDER METHODS
  function renderSeries() {
    if (!searchQuery)
      return (
        <div className="text-4xl text-white mt-12">Start with a search</div>
      );
    if (isLoading)
      return <div className="text-4xl text-white mt-12">Loading...</div>;

    if (data)
      return (
        <div className="w-11/12 mx-auto mt-12 grid justify-between grid-cols-[repeat(auto-fill,14rem)] gap-8">
          {data.map((series, i) => (
            <SeriesCard
              handleOnClick={handleSeriesClick}
              key={i + "-series"}
              series={series}
            />
          ))}
        </div>
      );

    return null;
  }

  return (
    <Layout title="Add Series">
      {Object.keys(currentSeries).length > 0 ? (
        <AddSeriesModal
          isShown={addSeries}
          series={currentSeries}
          passedRef={addSeriesRef}
        />
      ) : null}
      <div className="w-full text-center mt-6">
        <input
          type="text"
          placeholder="Search for a series or movie..."
          className="h-16 pl-6 w-11/12 rounded-xl outline-none bg-slate-600 focus:bg-slate-700 duration-150 text-white text-2xl"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        {renderSeries()}
      </div>
    </Layout>
  );
}
