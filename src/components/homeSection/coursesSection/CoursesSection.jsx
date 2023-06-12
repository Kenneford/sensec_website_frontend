import React from "react";
import { Link } from "react-router-dom";
import "./courses.scss";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function CoursesSection() {
  return (
    <div className="courseWrap">
      <div className="courseSecHeader">
        <h2>Our Popular Courses</h2>
      </div>
      <div className="courseCont">
        <div className="courseCard">
          <div className="courseImgWrap">
            <img
              src="/assets/images/home-img/business.jpg"
              alt=""
              className="courseImg"
            />
          </div>
          <div className="courseInfo">
            <h4>Business Management</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
          </div>
          <Link to={"/sensec/courses"}>
            <button className="courseBtn">Learn More</button>
          </Link>
        </div>
        <div className="courseCard">
          <div className="courseImgWrap">
            <img
              src="/assets/images/home-img/coding.jpg"
              alt=""
              className="courseImg"
            />
          </div>
          <div className="courseInfo">
            <h4>Computer Programming</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
          </div>
          <Link to={"/sensec/courses"}>
            <button className="courseBtn">Learn More</button>
          </Link>
        </div>
        <div className="courseCard">
          <div className="courseImgWrap">
            <img
              src="/assets/images/home-img/kitchen.jpg"
              alt=""
              className="courseImg"
            />
          </div>
          <div className="courseInfo">
            <h4>Home Economics</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
          </div>
          <Link to={"/sensec/courses"}>
            <button className="courseBtn">Learn More</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
