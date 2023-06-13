import React from "react";
import "./achievements.scss";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Diversity3Icon from "@mui/icons-material/Diversity3";

export default function Acheivements() {
  return (
    <div className="achieveWrap" id="achievements">
      <div className="achieveCont">
        <div className="achieveLeft">
          <img
            src="/assets/images/about-img/achievement.png"
            alt=""
            style={{ widows: "500px", height: "500px" }}
            className="achieveImg"
          />
        </div>
        <div className="achieveRight">
          <h1>Achievements</h1>
          <p className="achieveText">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words.
          </p>
          <div className="achieveCards">
            <div className="card cardCourse">
              <span className="cardIcon ">
                <SchoolIcon style={{ fontSize: "2rem", color: "#89870f" }} />
              </span>
              <h3>6</h3>
              <p>Courses</p>
            </div>
            <div className="card cardStudents">
              <span className="cardIcon">
                <PeopleAltIcon style={{ fontSize: "2rem", color: "#12519f" }} />
              </span>
              <h3>1,200+</h3>
              <p>Students</p>
            </div>
            <div className="card cardAlumni">
              <span className="cardIcon">
                <Diversity3Icon
                  style={{ fontSize: "2rem", color: "#108e2d" }}
                />
              </span>
              <h3>10,766+</h3>
              <p>Alumni</p>
            </div>
            <div className="card cardAwards">
              <span className="cardIcon">
                <EmojiEventsIcon
                  style={{ fontSize: "2rem", color: "#8e1410" }}
                />
              </span>
              <h3>17</h3>
              <p>Awards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
