import React, { useEffect, useState } from "react";
import "./imageSlider.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper";
import { Link } from "react-router-dom";
import SwiperNavBtn from "./SwiperNavBtn";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HashLink } from "react-router-hash-link";

export default function ImageSlider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperNavigation = useSwiper();

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  const animate = {
    off: { y: 50, opacity: 0 },
    on: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.3, duration: 3, delay: 1 },
    },
  };
  const animate1 = {
    off: { y: -50, opacity: 0 },
    on: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.3, duration: 3 },
    },
  };
  const animate2 = {
    off: { y: 50, opacity: 0 },
    on: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.3, duration: 3, delay: 0.5 },
    },
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <Swiper
      className="slideWrap mySwiper"
      effect={"coverflow"}
      modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
      grabCursor={true}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      // centeredSlides={true}
      spaceBetween={50}
      loop={true}
      slidesPerView="auto"
      pagination={{ el: ".swiper-pagination", clickable: true }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        clickable: true,
      }}
    >
      <SwiperSlide
        className="slideCont"
        style={{
          backgroundImage: `url("/assets/images/home-img/home-banner_img.avif")`,
        }}
      >
        <div className="overlay">
          <motion.h1 initial={"off"} whileInView={"on"} variants={animate1}>
            Senya Senior High School
          </motion.h1>
          <motion.h3 initial={"off"} whileInView={"on"} variants={animate2}>
            We are the best among equals!
          </motion.h3>
          <Link to={"/sensec/student_enrollment"}>
            <motion.button
              className="appointmentBtn"
              initial={"off"}
              whileInView={"on"}
              variants={animate}
            >
              Enroll Now!
            </motion.button>
          </Link>
        </div>
        {/* <img src="./assets/images/home-img/home-banner_img.avif" alt="" /> */}
      </SwiperSlide>
      <SwiperSlide
        className="slideCont"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80")`,
        }}
      >
        <div className="overlay">
          <motion.h1 initial={"off"} whileInView={"on"} variants={animate1}>
            How To Log Into Your Student Portal
          </motion.h1>
          <motion.h3 initial={"off"} whileInView={"on"} variants={animate2}>
            Kindly watch this short video on how to log into ITS support system.
          </motion.h3>
          <Link to={"/sensec/student/login"}>
            <motion.button
              className="appointmentBtn"
              initial={"off"}
              whileInView={"on"}
              variants={animate}
            >
              Click Here
            </motion.button>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide
        className="slideCont"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1506377872008-6645d9d29ef7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")`,
        }}
      >
        <div className="overlay">
          <motion.h1 initial={"off"} whileInView={"on"} variants={animate1}>
            School Library
          </motion.h1>
          <motion.h3 initial={"off"} whileInView={"on"} variants={animate2}>
            Our Library is fully resourced with all the needs of our Students.
          </motion.h3>
          <Link to={"/sensec/school_library#library"}>
            <motion.button
              className="appointmentBtn"
              initial={"off"}
              whileInView={"on"}
              variants={animate}
            >
              Read More
            </motion.button>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide
        className="slideCont"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80")`,
        }}
      >
        <div className="overlay">
          <motion.h1 initial={"off"} whileInView={"on"} variants={animate1}>
            IT Department
          </motion.h1>
          <motion.h3 initial={"off"} whileInView={"on"} variants={animate2}>
            All you need to know about our IT department.
          </motion.h3>
          <Link to={"/sensec/school_IT_department#it"}>
            <motion.button
              className="appointmentBtn"
              initial={"off"}
              whileInView={"on"}
              variants={animate}
            >
              Read More
            </motion.button>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide
        className="slideCont"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1514124725446-e963f5d6f354?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1629&q=80")`,
        }}
      >
        <div className="overlay">
          <motion.h1 initial={"off"} whileInView={"on"} variants={animate1}>
            School Cadet
          </motion.h1>
          <motion.h3 initial={"off"} whileInView={"on"} variants={animate2}>
            # 1 School Cadet in Ghana handled by top military officials.
          </motion.h3>
          <HashLink to={"/sensec/school_cadet#schoolCadet"}>
            <motion.button
              className="appointmentBtn"
              initial={"off"}
              whileInView={"on"}
              variants={animate}
            >
              Discover More
            </motion.button>
          </HashLink>
        </div>
      </SwiperSlide>
      <SwiperNavBtn />
    </Swiper>
  );
}
