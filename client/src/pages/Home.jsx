import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return <div className="container-fluid">Home Page</div>;
};

export default Home;
