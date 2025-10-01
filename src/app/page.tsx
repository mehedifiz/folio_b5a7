import Hero from "@/components/(section)/hero";
import React from "react";
import About from "../components/(section)/About";
import BlogsSection from "../components/(section)/HomeBlogs";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      <BlogsSection />

      
    </div>
  );
};

export default HomePage;
