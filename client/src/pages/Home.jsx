import React, { useState, useEffect } from "react";

import { getAllHotels } from "../store/actions/hotel";

import SmallCard from "../components/SmallCard/SmallCard";
import SearchForm from "../components/SearchForm/SearchForm";

const Home = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    loadAllHotels();
  }, []);

  const loadAllHotels = async () => {
    let res = await getAllHotels();
    setHotels(res.data);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>All hotels</h1>
      </div>
      <div className="col">
        <br />
        <SearchForm />
      </div>
      <div className="container-fluid">
        <br />
        {hotels.map((hotel) => {
          return <SmallCard key={hotel._id} hotel={hotel} owner={true} />;
        })}
      </div>
    </>
  );
};

export default Home;
