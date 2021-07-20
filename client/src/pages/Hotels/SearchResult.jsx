import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { searchListings } from "../../store/actions/hotel";

import SearchForm from "../../components/SearchForm/SearchForm";
import SmallCard from "../../components/SmallCard/SmallCard";

import queryString from "query-string";

const SearchResult = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchBed, setSearchBed] = useState("");
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const { location, date, bed } = queryString.parse(window.location.search);
    searchListings({ location, date, bed }).then((res) => {
      setHotels(res.data);
    });
  }, [window.location.search]);

  return (
    <>
      <div className="col">
        <br />
        <SearchForm />
      </div>
      <div className="container">
        <div className="row">
          {hotels.map((hotel) => (
            <SmallCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchResult;
