import React, { useEffect } from "react";
import "./categories.scss";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView, staggerChildren } from "react-intersection-observer";

export default function ProgramSection() {
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }
  // const { ref, inView } = useInView({
  //   threshold: 0.3,
  // });
  // const animation1 = useAnimation();
  // const animation2 = useAnimation();
  // const animation3 = useAnimation();
  // useEffect(() => {
  //   console.log("In View: ", inView);
  //   if (inView) {
  //     animation1.start({
  //       x: 0,
  //       opacity: 1,
  //       rotate: [0, 90, 0],
  //       transition: {
  //         type: "spring",
  //         duration: 3,
  //         bounce: 0.4,
  //       },
  //     });
  //   }
  //   if (!inView) {
  //     animation1.start({
  //       x: "-50vw",
  //       opacity: 0,
  //     });
  //   }
  //   if (inView) {
  //     animation2.start({
  //       x: 0,
  //       transition: {
  //         type: "spring",
  //         duration: 5,
  //         bounce: 0.3,
  //         when: "beforeChildren",
  //       },
  //     });
  //   }
  //   if (!inView) {
  //     animation2.start({
  //       x: "100vw",
  //     });
  //   }
  //   if (inView) {
  //     animation3.start({
  //       x: 0,
  //       staggerChildren: 0.2,
  //     });
  //   }
  //   if (!inView) {
  //     animation3.start({
  //       x: "100vw",
  //     });
  //   }
  // }, [inView, animation1, animation2, animation3]);

  const animate = {
    off: { x: 50, opacity: 0 },
    on: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  const animate1 = {
    off: { x: -50, opacity: 0 },
    on: { x: 0, opacity: 1, transition: { duration: 1 } },
  };
  return (
    <div className="catWrap">
      <motion.div className="catCont">
        <motion.div
          className="catLeft"
          initial={"off"}
          whileInView={"on"}
          variants={animate1}
          // transition={{ type: "spring", duration: 3, bounce: 0.3 }}
        >
          <h1>Programs</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <HashLink
            to={"/sensec/courses/#courses"}
            smooth
            scroll={scrollWithOffset}
          >
            <button className="catBtn">Learn More</button>
          </HashLink>
        </motion.div>
        <motion.div
          className="catRight"
          // ref={ref}
          initial={"off"}
          whileInView={"on"}
          variants={animate}
          // transition={{ staggerChildren: 1 }}
          // transition={{ type: "spring", duration: 3, bounce: 0.3 }}
        >
          <motion.div className="catCard" variants={animate}>
            <span className="catIcon">
              <img src="/assets/sensec-logo1.png" alt="" className="catImg" />
            </span>
            <h5>Agriculture</h5>
            <p>
              Lorem Ipsum has been the industry's standard dummy text to make a
              type specimen book...
            </p>
          </motion.div>
          <motion.div className="catCard" variants={animate}>
            <span className="catIcon">
              <img src="/assets/sensec-logo1.png" alt="" className="catImg" />
            </span>
            <h5>Visual Art</h5>
            <p>
              Lorem Ipsum has been the industry's standard dummy text to make a
              type specimen book...
            </p>
          </motion.div>
          <motion.div className="catCard" variants={animate}>
            <span className="catIcon">
              <img src="/assets/sensec-logo1.png" alt="" className="catImg" />
            </span>
            <h5>Science</h5>
            <p>
              Lorem Ipsum has been the industry's standard dummy text to make a
              type specimen book...
            </p>
          </motion.div>
          <motion.div className="catCard" variants={animate}>
            <span className="catIcon">
              <img src="/assets/sensec-logo1.png" alt="" className="catImg" />
            </span>
            <h5>Business</h5>
            <p>
              Lorem Ipsum has been the industry's standard dummy text to make a
              type specimen book...
            </p>
          </motion.div>
          <motion.div className="catCard" variants={animate}>
            <span className="catIcon">
              <img src="/assets/sensec-logo1.png" alt="" className="catImg" />
            </span>
            <h5>General Art</h5>
            <p>
              Lorem Ipsum has been the industry's standard dummy text to make a
              type specimen book...
            </p>
          </motion.div>
          <motion.div className="catCard" variants={animate}>
            <span className="catIcon">
              <img src="/assets/sensec-logo1.png" alt="" className="catImg" />
            </span>
            <h5>Home Economics</h5>
            <p>
              Lorem Ipsum has been the industry's standard dummy text to make a
              type specimen book...
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
