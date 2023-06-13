import React from "react";
import "./banner.scss";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="bannerWrap">
      <div
        className="bannerImg"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1562516875-a8316c161614?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80")`,
        }}
      >
        <div className="overlay">
          <h1>About Us</h1>
          <span>( Senya Senior High School )</span>
        </div>
      </div>
      <div className="links">
        <Link to={"#"}>Vision</Link>
        <Link to={"#"}>History</Link>
        <Link to={"#"}>Achievements</Link>
        <Link to={"#"}>Our Team</Link>
      </div>
    </div>
  );
}
