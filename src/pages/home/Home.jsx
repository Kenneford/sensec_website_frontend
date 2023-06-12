import React from "react";
import ImageSlider from "../../components/homeSection/imageSlider/ImageSlider";
import FirstViewSection from "../../components/homeSection/firstViewSection/FirstViewSection";
import CategorySection from "../../components/homeSection/categorySection/categorySection";
import CoursesSection from "../../components/homeSection/coursesSection/CoursesSection";

export default function Home() {
  return (
    <div className="home" id="homepage">
      <ImageSlider />
      <FirstViewSection />
      <CategorySection />
      <CoursesSection />
    </div>
  );
}
