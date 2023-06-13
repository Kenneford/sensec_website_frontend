import React from "react";
import "./course.scss";
import Banner from "../../components/coursesSection/banner/Banner";
import AllCourses from "../../components/coursesSection/courses/AllCourses";
import Footer from "../../components/footer/Footer";

export default function Courses() {
  return (
    <div className="courses" id="courses">
      <Banner />
      <AllCourses />
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
