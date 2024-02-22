import React from "react";
import Header from "../components/Header";
import Products from "../components/Products";
import Testimonials from "../components/Testimonials";
import Categories from "../components/Categories";
import Gallery from "../components/Gallery";
import Reviews from "../components/Reviews";

function LandingPage() {
  return (
    <>
      <Header />
      <Products />

      <Testimonials />
      <Categories />
      <Gallery />
      <Reviews />
    </>
  );
}

export default LandingPage;
