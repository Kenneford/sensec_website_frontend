import React from "react";
import "./allCourses.scss";
import { Link } from "react-router-dom";

export default function AllCourses() {
  return (
    <div className="coursesWrap">
      <div className="links">
        <Link to={"#"}>Agriculture</Link>
        <Link to={"#"}>Visual Art</Link>
        <Link to={"#"}>Science</Link>
        <Link to={"#"}>Business</Link>
        <Link to={"#"}>General Art</Link>
        <Link to={"#"}>Home Economics</Link>
      </div>
      <div className="coursesCont">
        <div className="coursesLeft">
          <div className="course" id="agriculture">
            <h1 className="title">Agriculture</h1>
            <img
              src="https://images.unsplash.com/photo-1557234195-bd9f290f0e4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
              className="enrollImg"
            />
            <p>
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and a search for 'lorem
              ipsum' will uncover many web sites still in their infancy. Various
              versions have evolved over the years, sometimes by accident,
              sometimes on purpose (injected humour and the like).
            </p>
            <Link to={"#"}>
              <button>Learn More</button>
            </Link>
          </div>
          <div className="course" id="visualArt">
            <h1 className="title">Visual Art</h1>
            <img
              src="https://images.unsplash.com/photo-1525254646234-87ffe274c810?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
              className="enrollImg"
            />
            <p>
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and a search for 'lorem
              ipsum' will uncover many web sites still in their infancy. Various
              versions have evolved over the years, sometimes by accident,
              sometimes on purpose (injected humour and the like).
            </p>
            <Link to={"#"}>
              <button>Learn More</button>
            </Link>
          </div>
          <div className="course" id="science">
            <h1 className="title">Science</h1>
            <img
              src="https://images.unsplash.com/photo-1617155093730-a8bf47be792d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
              className="enrollImg"
            />
            <p>
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and a search for 'lorem
              ipsum' will uncover many web sites still in their infancy. Various
              versions have evolved over the years, sometimes by accident,
              sometimes on purpose (injected humour and the like).
            </p>
            <Link to={"#"}>
              <button>Learn More</button>
            </Link>
          </div>
        </div>
        <div className="coursesRight">
          <div className="course" id="business">
            <div className="img">
              <h1>Business</h1>
              <img
                src="https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                alt=""
                className="enrollImg"
              />
            </div>
            <p>
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and a search for 'lorem
              ipsum' will uncover many web sites still in their infancy. Various
              versions have evolved over the years, sometimes by accident,
              sometimes on purpose (injected humour and the like).
            </p>
            <Link to={"#"}>
              <button>Learn More</button>
            </Link>
          </div>
          <div className="course" id="generalArt">
            <div className="img">
              <h1>General Art</h1>
              <img
                src="https://plus.unsplash.com/premium_photo-1661781303670-5fe01555296e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
                className="enrollImg"
              />
            </div>
            <p>
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and a search for 'lorem
              ipsum' will uncover many web sites still in their infancy. Various
              versions have evolved over the years, sometimes by accident,
              sometimes on purpose (injected humour and the like).
            </p>
            <Link to={"#"}>
              <button>Learn More</button>
            </Link>
          </div>
          <div className="course" id="homeEconomics">
            <div className="img">
              <h1>Home Economics</h1>
              <img
                src="https://plus.unsplash.com/premium_photo-1682097054374-43bfdbef7e2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
                className="enrollImg"
              />
            </div>
            <p>
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and a search for 'lorem
              ipsum' will uncover many web sites still in their infancy. Various
              versions have evolved over the years, sometimes by accident,
              sometimes on purpose (injected humour and the like).
            </p>
            <Link to={"#"}>
              <button>Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
