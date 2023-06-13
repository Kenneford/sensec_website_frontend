import React from "react";
import "./banner.scss";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="bannerWrap">
      <div
        className="bannerImg"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1462536943532-57a629f6cc60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80")`,
        }}
      >
        <div className="overlay">
          <h1>Become Our Student Today!</h1>
          {/* <Link to={"/sensec/enrollment"}>
            <button className="appointment">Enroll Now!</button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}
