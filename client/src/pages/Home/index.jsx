import React from "react";
import CardSlider from "../../components/CardSlider";
import PersonalizedSuggest from "../../components/PersonalizedSuggest";

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
