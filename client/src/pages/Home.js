import React from "react";
import Navbar from "../components/Navbar";
import "./home.css";
import Header from "../components/Header";
import Featured from "../components/Featured";
import CarList from "../components/CarList";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer"></div>
      <Featured />
      <h1 className="homeTitle">By Location</h1>
      <CarList />
    </div>
  );
};

export default Home;
