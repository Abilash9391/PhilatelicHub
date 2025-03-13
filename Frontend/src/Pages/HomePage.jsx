import React from "react";
import HomepageHero from "../Components/Home/HomepageHero";
import AddHero from "../Components/Home/AddHero";
import NewCollection from "../Components/Home/NewCollection";
import NewsLetter from "../Components/Home/NewsLetter";
import HeroCollection from "../Components/Home/HeroCollection";

const HomePage = ({ activeTab, setActiveTab }) => {
  return (
    <>
      <HomepageHero activeTab={activeTab} setActiveTab={setActiveTab} />
      <HeroCollection />
      {/* <AddHero /> */}
      {/* <NewCollection activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      <NewsLetter />
    </>
  );
};

export default HomePage;
