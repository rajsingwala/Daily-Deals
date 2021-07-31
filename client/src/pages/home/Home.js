import React from "react";
import HomeCarousel from "../../components/carousel/HomeCarousel";
import BestSeller from "./BestSeller";
import HomeCategories from "./HomeCategories";
import HomeSubs from "./HomeSubs";
import NewArrivals from "./NewArrivals";

const Home = () => {
  return (
    <>
      <HomeCarousel />
      <div className="home">
        <NewArrivals />
        <BestSeller />
        <HomeCategories />
        <HomeSubs />
      </div>
    </>
  );
};

export default Home;
