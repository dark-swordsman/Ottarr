import { useEffect, useRef, useState } from "react";
import API from "../helper/API/API";

import {
  AddSeriesModal,
  Layout,
  SeriesCard,
} from "../components";

export default function AddSeries() {
  const addSeriesRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [enterPressed, setEnterPressed] = useState(false);
  const [_data, _setData] = useState({});
  const [data, setData] = useState([]);
  const [queryTimeout, setQueryTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addSeries, setAddSeries] = useState(false);
  const [currentSeries, setCurrentSeries] = useState({});

  // add listener for enter key to search
  useEffect(() => document.addEventListener("keydown", handleSearchEnterKey, false), []);

  // handle search timing
  useEffect(() => {
    function search() {
      API.tmdb.search(searchQuery)
        .then((responseData) => {
          _setData(responseData);
          setIsLoading(false);
        });
    }

    if (searchQuery) {
      if (!isLoading) setIsLoading(true);

      if (enterPressed) {
        search();
        setTimeout(() => setEnterPressed(false), 300);
      } else {
        setQueryTimeout(setTimeout(() => search(), 2000));
        
        return () => clearTimeout(queryTimeout) && setQueryTimeout(null);
      }
    } else {
      clearTimeout(queryTimeout);
      setIsLoading(false);
      setQueryTimeout(null);
    }
  }, [searchQuery, enterPressed])

  // filter TMDB query data
  useEffect(async () => {
    if (Object.keys(_data).length > 0) {
      let seriesArray = [];
  
      await _data.tv.results.forEach((result) => seriesArray.push({ ...result, type: "tv" }));
      await _data.movie.results.forEach((result) => seriesArray.push({ ...result, type: "movie" }));

      console.log(seriesArray);
  
      setData(seriesArray);
    }
  }, [_data]);

  // handle close of addseries modal
  useEffect(() => {
    function handleClickOutside(e) {
      if (addSeriesRef.current && !addSeriesRef.current.contains(e.target)) setAddSeries(false);
    };

    function handleEscapeKey(e) {
      if (e.keyCode === 27) setAddSeries(false);
    }

    if (addSeries) {
      document.addEventListener("click", handleClickOutside, false);
      document.addEventListener("keydown", handleEscapeKey, false);

      return () => {
        document.removeEventListener("click", handleClickOutside, false);
        document.removeEventListener("keydown", handleEscapeKey, false);
      };
    }
  }, [addSeries]);

  function handleSearchEnterKey(e) {
    if (e.keyCode === 13) setEnterPressed(true);
  }

  function handleAddSeriesClick(series) {
    setCurrentSeries(series);
    setAddSeries(true);

  }
  
  // RENDER METHODS
  function renderSeries() {
    if (!searchQuery) return <div className="text-4xl text-white mt-12">Start with a search</div>;
    if (isLoading) return <div className="text-4xl text-white mt-12">Loading...</div>;

    if (data) return <div className="w-11/12 mx-auto mt-12 grid grid-cols-6 gap-8 justify-center">{data.map((series, i) => <SeriesCard handleOnClick={handleAddSeriesClick} key={i + "-series"} series={series} />)}</div>;

    return null;
  }

  return (
    <Layout title="Add Series">
      { Object.keys(currentSeries).length > 0 ? <AddSeriesModal isShown={addSeries} series={currentSeries} passedRef={addSeriesRef} /> : null }
      <div className="w-full text-center mt-6">
        <input type="text" placeholder="Search for a series or movie..." className="h-16 pl-6 w-11/12 rounded-xl outline-none bg-slate-600 focus:bg-slate-700 duration-150 text-white text-2xl" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        {renderSeries()}
      </div>
    </Layout>
  );
}