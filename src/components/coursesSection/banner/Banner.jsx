import React from "react";
import "./banner.scss";

export default function Banner() {
  return (
    <div className="bannerWrap">
      <div
        className="bannerImg"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")`,
        }}
      >
        <div className="overlay">
          <h1>Available Courses</h1>
          <span>( Senya Senior High School )</span>
        </div>
      </div>
    </div>
  );
}
