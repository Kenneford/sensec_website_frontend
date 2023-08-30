import React from "react";
import "./testimonial.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Footer from "../../footer/Footer";

export default function TestimonialSection() {
  return (
    <div className="testimonialWrap">
      <div className="testimonialHeader">
        <h2>What Our Alumni Says</h2>
      </div>
      <Swiper
        className="testimonialCont mySwiper"
        effect={"coverflow"}
        modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
        grabCursor={true}
        autoplay={true}
        // centeredSlides={true}
        spaceBetween={50}
        loop={true}
        // slidesPerView={3}
        coverflowEffect={
          {
            //   rotate: 0,
            //   stretch: 0,
            //   depth: 100,
            //   modifier: 2.5,
          }
        }
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        breakpoints={{
          1800: {
            width: 1520,
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1600: {
            width: 1300,
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1024: {
            width: 940,
            slidesPerView: 2,
            spaceBetween: 0,
          },
          960: {
            width: 910,
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            width: 720,
            slidesPerView: 1,
            spaceBetween: 0,
          },
          520: {
            width: 470,
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
      >
        <SwiperSlide className="testimonial">
          <div className="alumniImg">
            <img
              src="https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
          </div>
          <div className="alumniInfo">
            <h5>Jennifer Aboagye</h5>
            <span>Web Developer (2009)</span>
          </div>
          <div className="testimonialText">
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum .
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="testimonial">
          <div className="alumniImg">
            <img
              src="https://images.unsplash.com/photo-1592275772614-ec71b19e326f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
          </div>
          <div className="alumniInfo">
            <h5>Millicent Ama Gyamfoah</h5>
            <span>Caterer (2003)</span>
          </div>
          <div className="testimonialText">
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum .
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="testimonial">
          <div className="alumniImg">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
          </div>
          <div className="alumniInfo">
            <h5>Benjamin Acquah</h5>
            <span>Lecturer (2009)</span>
          </div>
          <div className="testimonialText">
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum .
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="testimonial">
          <div className="alumniImg">
            <img
              src="https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
          </div>
          <div className="alumniInfo">
            <h5>Stephen Ansah</h5>
            <span>Bank Manager (2017)</span>
          </div>
          <div className="testimonialText">
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum .
            </p>
          </div>
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow"></div>
          <div className="swiper-button-next slider-arrow"></div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
