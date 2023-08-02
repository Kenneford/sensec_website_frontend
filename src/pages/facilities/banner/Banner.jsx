import React from "react";
import "./banner.scss";

export default function Banner() {
  return (
    <div className="bannerWrap">
      <div
        className="bannerImg"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1497465689543-5940d3cede89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80")`,
        }}
      >
        <div className="overlay">
          <h1>School Facilities</h1>
          <span>( Senya Senior High School )</span>
        </div>
      </div>
    </div>
  );
}
