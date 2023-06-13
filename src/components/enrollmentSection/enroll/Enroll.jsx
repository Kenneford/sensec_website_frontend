import React from "react";
import "./enroll.scss";
import { Link } from "react-router-dom";
import Footer from "../../footer/Footer";
import { motion, Variants } from "framer-motion";

const animate = {
  off: { y: -40, opacity: 0 },
  on: { y: 0, opacity: 1, transition: { duration: 1 } },
};

export default function Enroll() {
  return (
    <div className="enrolWrap">
      <div className="links">
        <Link to={"#"}>Enrolment</Link>
        <Link to={"#"}>Process</Link>
        <Link to={"#"}>Transition</Link>
        <Link to={"#"}>Semester Details</Link>
        <Link to={"#"}>Scholarships</Link>
        <Link to={"#"}>Advice</Link>
        <Link to={"#"}>Apply</Link>
      </div>
      <div className="enrollCont">
        <div className="enrollLeft">
          <div className="enroll">
            <h1>Enrolment</h1>
            <img
              src="https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
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
          <div className="enroll">
            <h1>Transition</h1>
            <img
              src="https://plus.unsplash.com/premium_photo-1680807868966-90a84c68c944?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
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
          <div className="enroll">
            <h1>Advice</h1>
            <img
              src="https://images.unsplash.com/photo-1507537362848-9c7e70b7b5c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80https://images.unsplash.com/photo-1507537362848-9c7e70b7b5c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
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

        <div className="enrollRight">
          <div className="enroll">
            <div className="img">
              <h1>Process</h1>
              <img
                src="https://images.unsplash.com/photo-1573497701240-345a300b8d36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
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
          <div className="enroll">
            <div className="img">
              <h1>Semester Dates & Fees</h1>
              <img
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
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
          <div className="enroll">
            <div className="img">
              <h1>Scholarships</h1>
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
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
          <div className="enroll">
            <div className="img">
              <h1>Apply Now!</h1>
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
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
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
