import React from "react";
import "./facilities.scss";
import { Link } from "react-router-dom";

export default function Facilities() {
  return (
    <div className="facilitiesWrap">
      <div className="facilitiesCont">
        <div className="facilitiesLeft">
          <h2>School Facilities</h2>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text.
          </p>
          <Link to={"/sensec/facilities"}>
            <button className="facilityBtn">Discover More</button>
          </Link>
        </div>
        <div className="facilitiesRight">
          <div className="facilities">
            <div
              className="facilityCard"
              style={{
                backgroundImage: `url("/assets/images/home-img/lab_img.avif")`,
              }}
            >
              <div className="colorOverlay">
                <h4>Science Laboratory</h4>
                <Link to={"/sensec/facility?=science_laboratory"}>
                  <button>View</button>
                </Link>
              </div>
            </div>
            <div
              className="facilityCard"
              style={{
                backgroundImage: `url("/assets/images/home-img/computer_img.avif")`,
              }}
            >
              <div className="colorOverlay">
                <h4>Computer Classroom</h4>
                <Link to={"/sensec/facility?=computer_classroom"}>
                  <button>View</button>
                </Link>
              </div>
            </div>
            <div
              className="facilityCard"
              style={{
                backgroundImage: `url("/assets/images/home-img/library_img.avif")`,
              }}
            >
              <div className="colorOverlay">
                <h4>School Library</h4>
                <Link to={"/sensec/facility?=library"}>
                  <button>View</button>
                </Link>
              </div>
            </div>
            <div
              className="facilityCard"
              style={{
                backgroundImage: `url("/assets/images/home-img/field_img.avif")`,
              }}
            >
              <div className="colorOverlay">
                <h4>Football Field</h4>
                <Link to={"/sensec/facility?=football_field"}>
                  <button>View</button>
                </Link>
              </div>
            </div>
            <div
              className="facilityCard"
              style={{
                backgroundImage: `url("/assets/images/home-img/canteen_img.avif")`,
              }}
            >
              <div className="colorOverlay">
                <h4>School Canteen</h4>
                <Link to={"/sensec/facility?=canteen"}>
                  <button>View</button>
                </Link>
              </div>
            </div>
            <div
              className="facilityCard"
              style={{
                backgroundImage: `url("/assets/images/home-img/dom_img.avif")`,
              }}
            >
              <div className="colorOverlay">
                <h4>Dometories</h4>
                <Link to={"/sensec/facility?="}>
                  <button>View</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
