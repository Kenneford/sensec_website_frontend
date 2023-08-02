import React from "react";
import ImageSlider from "../../components/homeSection/imageSlider/ImageSlider";
import FirstViewSection from "../../components/homeSection/firstViewSection/FirstViewSection";
import CoursesSection from "../../components/homeSection/coursesSection/CoursesSection";
import Facilities from "../../components/homeSection/facilitiesSection/Facilities";
import Kadet from "../../components/homeSection/kadet/Kadet";
import QuestionsSection from "../../components/homeSection/questionsSection/QuestionsSection";
import TestimonialSection from "../../components/homeSection/testimonialSection/TestimonialSection";
import ProgramSection from "../../components/homeSection/categorySection/ProgramSection";

export default function Home() {
  return (
    <div className="home" id="homepage">
      <ImageSlider />
      <FirstViewSection />
      <ProgramSection />
      <CoursesSection />
      <Facilities />
      <Kadet />
      <QuestionsSection />
      <TestimonialSection />
    </div>
  );
}
