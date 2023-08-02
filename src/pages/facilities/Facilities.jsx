import React from "react";
import "./facilities.scss";
import { Link } from "react-router-dom";
import Banner from "./banner/Banner";

export default function Facilities() {
  return (
    <div className="facilityWrap" id="facilities">
      <Banner />
      <div className="coursesWrap">
        <div className="links">
          <Link to={"#"}>Science Laboratory</Link>
          <Link to={"#"}>Computer Classroom</Link>
          <Link to={"#"}>School Library</Link>
          <Link to={"#"}>Football Field</Link>
          <Link to={"#"}>School Canteen</Link>
          <Link to={"#"}>Dometories</Link>
        </div>
        <div className="coursesCont">
          <div className="coursesLeft">
            <div className="course" id="agriculture">
              <h1 className="title">Science Laboratory</h1>
              <img
                src="/assets/images/home-img/lab_img.avif"
                alt=""
                className="enrollImg"
              />
              <p>
                Many desktop publishing packages and web page editors now use
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
              <Link to={`/sensec/facilities_overview/Science_Laboratory`}>
                <button>Learn More</button>
              </Link>
            </div>
            <div className="course" id="visualArt">
              <h1 className="title">Computer Classroom</h1>
              <img
                src="/assets/images/home-img/computer_img.avif"
                alt=""
                className="enrollImg"
              />
              <p>
                Many desktop publishing packages and web page editors now use
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
              <Link to={`/sensec/facilities_overview/Computer_Classroom`}>
                <button>Learn More</button>
              </Link>
            </div>
            <div className="course" id="science">
              <h1 className="title">School Library</h1>
              <img
                src="/assets/images/home-img/library_img.avif"
                alt=""
                className="enrollImg"
              />
              <p>
                Many desktop publishing packages and web page editors now use
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
              <Link to={`/sensec/facilities_overview/School_Library`}>
                <button>Learn More</button>
              </Link>
            </div>
          </div>
          <div className="coursesRight">
            <div className="course" id="business">
              <div className="img">
                <h1>Football Field</h1>
                <img
                  src="/assets/images/home-img/field_img.avif"
                  alt=""
                  className="enrollImg"
                />
              </div>
              <p>
                Many desktop publishing packages and web page editors now use
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
              <Link to={`/sensec/facilities_overview/Football_Field`}>
                <button>Learn More</button>
              </Link>
            </div>
            <div className="course" id="generalArt">
              <div className="img">
                <h1>School Canteen</h1>
                <img
                  src="/assets/images/home-img/canteen_img.avif"
                  alt=""
                  className="enrollImg"
                />
              </div>
              <p>
                Many desktop publishing packages and web page editors now use
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
              <Link to={`/sensec/facilities_overview/School_Canteen`}>
                <button>Learn More</button>
              </Link>
            </div>
            <div className="course" id="homeEconomics">
              <div className="img">
                <h1>Dometories</h1>
                <img
                  src="/assets/images/home-img/dom_img.avif"
                  alt=""
                  className="enrollImg"
                />
              </div>
              <p>
                Many desktop publishing packages and web page editors now use
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
              <Link to={`/sensec/facilities_overview/Dometories`}>
                <button>Learn More</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
