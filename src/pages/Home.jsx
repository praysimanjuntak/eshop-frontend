import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = ({ user, items, isSignedIn, logout}) => {
  return (
    <div>
      <Announcement />
      <Navbar logout={logout} isSignedIn={isSignedIn} user={user}/>
      <div>
        <Slider />
        <Categories />
        <Products items={items}/>
        <Newsletter/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
