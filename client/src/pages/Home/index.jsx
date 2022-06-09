import React from "react";
import Nav from "../../components/Nav";
import CardSlider from "../../components/CardSlider";
import CategoryGrid from "../../components/CategoryGrid";
import PersonalizedSuggest from "../../components/PersonalizedSuggest";
import { useSelector } from "react-redux";

const Home = () => {
  return (
    <div className="home">

      <div className="bannerHome"></div>

      <PersonalizedSuggest />
      <CardSlider />
    </div>
  );
};

export default Home;
