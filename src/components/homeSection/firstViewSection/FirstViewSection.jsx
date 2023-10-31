import React from "react";
import "./firstView.scss";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HashLink } from "react-router-hash-link";

export default function FirstViewSection() {
  const scrollWithOffset = (el) => {
    // const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  const animate = {
    off: { x: 100, opacity: 0 },
    on: { x: 0, opacity: 1, transition: { duration: 1 } },
  };

  const animate1 = {
    off: { x: -100, opacity: 0 },
    on: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="secWrap">
      <div className="secCont">
        <motion.div
          className="secLeft"
          // initial={{ x: "-100vw" }}
          // animate={{ x: 0 }}
          // transition={{ type: "spring", duration: 3, bounce: 0.3 }}
          initial={"off"}
          whileInView={"on"}
          variants={animate1}
        >
          <motion.h1>A Perfect School For All</motion.h1>
          <motion.p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </motion.p>
          <HashLink
            to={"/sensec/about#about"}
            smooth
            scrollWithOffset={scrollWithOffset}
          >
            <motion.button className="startBtn">Learn More</motion.button>
          </HashLink>
        </motion.div>
        <motion.div
          className="secRight"
          initial={"off"}
          whileInView={"on"}
          variants={animate}
          // initial={{ scale: 0 }}
          // animate={{ scale: 1 }}
          // transition={{ type: "spring", delay: 2, duration: 1, bounce: 0.3 }}
        >
          <img
            src="https://images.unsplash.com/photo-1536337005238-94b997371b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
            alt=""
            className="homeImg"
          />
        </motion.div>
      </div>
    </div>
  );
}
