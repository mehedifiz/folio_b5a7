import Hero from "@/components/(section)/hero";
import React from "react";
import About from "../components/(section)/About";
import BlogsSection from "../components/(section)/HomeBlogs";
import ProjectSection from "@/components/(section)/HomeProjectsection";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      <BlogsSection />

      <ProjectSection/>

      
    </div>
  );
};

export default HomePage;
