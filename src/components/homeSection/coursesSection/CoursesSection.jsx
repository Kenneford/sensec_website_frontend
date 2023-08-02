import React from "react";
import { Link } from "react-router-dom";
import "./courses.scss";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HashLink } from "react-router-hash-link";

export default function CoursesSection() {
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  const scrollWithOffset1 = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -160;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }
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
          <HashLink
            to={"/sensec/courses#business"}
            smooth
            scroll={scrollWithOffset}
          >
            <button className="courseBtn">Learn More</button>
          </HashLink>
        </div>
        <div className="courseCard">
          <div className="courseImgWrap">
            <img
              src="https://images.unsplash.com/photo-1557234195-bd9f290f0e4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
              className="courseImg"
            />
          </div>
          <div className="courseInfo">
            <h4>Agriculture Science</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
          </div>
          <HashLink
            to={"/sensec/courses#agriculture"}
            smooth
            scroll={scrollWithOffset1}
          >
            <button className="courseBtn">Learn More</button>
          </HashLink>
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
          <HashLink
            to={"/sensec/courses#homeEconomics"}
            smooth
            scroll={scrollWithOffset}
          >
            <button className="courseBtn">Learn More</button>
          </HashLink>
        </div>
      </div>
    </div>
  );
}
