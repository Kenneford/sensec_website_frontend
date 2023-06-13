import React from "react";
import "./ourVision.scss";
import { Link } from "react-router-dom";

export default function OurVision() {
  return (
    <div className="visionWrap" id="vision">
      <div className="visionCont">
        <div className="vision">
          <div className="visionRight">
            <img
              src="https://images.unsplash.com/photo-1520569495996-b5e1219cb625?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1094&q=80"
              alt=""
            />
          </div>
          <div className="visionLeft">
            <h2>Vision And Values</h2>
            <p>
              The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced below for those interested. Sections 1.10.32 and
              1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
              reproduced in their exact original form, accompanied by English
              versions from the 1914 translation by H. Rackham.
            </p>
            <Link to={"#"}>
              <button className="visionBtn">Learn More</button>
            </Link>
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}
