import React from "react";
import "./ourHistory.scss";
import { Link } from "react-router-dom";

export default function OurHistory() {
  return (
    <div className="historyWrap" id="history">
      <div className="historyCont">
        <div className="history">
          <div className="historyLeft">
            <h2>Our History</h2>
            <p>
              The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced below for those interested. Sections 1.10.32 and
              1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
              reproduced in their exact original form, accompanied by English
              versions from the 1914 translation by H. Rackham.
            </p>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text.
            </p>
            <Link to={"#"}>
              <button className="historyBtn">Learn More</button>
            </Link>
          </div>
          <div className="historyRight">
            <img
              src="https://images.unsplash.com/photo-1522661067900-ab829854a57f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt=""
            />
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}
