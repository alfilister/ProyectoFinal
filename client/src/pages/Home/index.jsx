import React from "react";
import Nav from "../../components/Nav";
import CardSlider from "../../components/CardSlider";
import CategoryGrid from "../../components/CategoryGrid";
import PersonalizedSuggest from "../../components/PersonalizedSuggest";
import { useSelector } from "react-redux";

const Home = () => {
  return (
    <div className="home">
      <br></br>
      <CategoryGrid />
      <PersonalizedSuggest />
      <CardSlider />
    </div>
  );
};

export default Home;
