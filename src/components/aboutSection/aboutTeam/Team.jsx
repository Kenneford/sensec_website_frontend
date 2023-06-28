import React from "react";
import "./team.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";
import Footer from "../../footer/Footer";

export default function Team() {
  return (
    <div className="teamWrap" id="ourTeam">
      <div className="teamHeader">
        <h2>Meet Our Team</h2>
      </div>
      <div className="teamCont">
        <div className="teamMember">
          <div className="memberImage">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
          </div>
          <div className="memberInfo">
            <h4>Maxwell Gyan</h4>
            <p>Head of School</p>
          </div>
          <div className="memberSocials">
            <Link to={"#"}>
              <FacebookIcon />
            </Link>
            <Link to={"#"}>
              <InstagramIcon />
            </Link>
            <Link to={"#"}>
              <TwitterIcon />
            </Link>
          </div>
        </div>
        <div className="teamMember">
          <div className="memberImage">
            <img
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80"
              alt=""
            />
          </div>
          <div className="memberInfo">
            <h4>Matilda Asante</h4>
            <p>School Secretary</p>
          </div>
          <div className="memberSocials">
            <Link to={"#"}>
              <FacebookIcon />
            </Link>
            <Link to={"#"}>
              <InstagramIcon />
            </Link>
            <Link to={"#"}>
              <TwitterIcon />
            </Link>
          </div>
        </div>
        <div className="teamMember">
          <div className="memberImage">
            <img
              src="https://images.unsplash.com/photo-1546071267-5cfb1e0e8f41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
          </div>
          <div className="memberInfo">
            <h4>Elena Viorica Annan</h4>
            <p>Head of Staff</p>
          </div>
          <div className="memberSocials">
            <Link to={"#"}>
              <FacebookIcon />
            </Link>
            <Link to={"#"}>
              <InstagramIcon />
            </Link>
            <Link to={"#"}>
              <TwitterIcon />
            </Link>
          </div>
        </div>
        <div className="teamMember">
          <div className="memberImage">
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
          </div>
          <div className="memberInfo">
            <h4>Alexanda Dzifa</h4>
            <p>Sports Master</p>
          </div>
          <div className="memberSocials">
            <Link to={"#"}>
              <FacebookIcon />
            </Link>
            <Link to={"#"}>
              <InstagramIcon />
            </Link>
            <Link to={"#"}>
              <TwitterIcon />
            </Link>
          </div>
        </div>
        <div className="teamMember">
          <div className="memberImage">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
          </div>
          <div className="memberInfo">
            <h4>James Kwaku Hammond</h4>
            <p>Ass. Head of School</p>
          </div>
          <div className="memberSocials">
            <Link to={"#"}>
              <FacebookIcon />
            </Link>
            <Link to={"#"}>
              <InstagramIcon />
            </Link>
            <Link to={"#"}>
              <TwitterIcon />
            </Link>
          </div>
        </div>
        <div className="teamMember">
          <div className="memberImage">
            <img
              src="https://plus.unsplash.com/premium_photo-1676325102686-68bac76bd7e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
          </div>
          <div className="memberInfo">
            <h4>Nancy Anning</h4>
            <p>Head of Laboratory</p>
          </div>
          <div className="memberSocials">
            <Link to={"#"}>
              <FacebookIcon />
            </Link>
            <Link to={"#"}>
              <InstagramIcon />
            </Link>
            <Link to={"#"}>
              <TwitterIcon />
            </Link>
          </div>
        </div>
        <div className="teamMember">
          <div className="memberImage">
            <img
              src="https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
          </div>
          <div className="memberInfo">
            <h4>Julian Becker</h4>
            <p>School Accountant</p>
          </div>
          <div className="memberSocials">
            <Link to={"#"}>
              <FacebookIcon />
            </Link>
            <Link to={"#"}>
              <InstagramIcon />
            </Link>
            <Link to={"#"}>
              <TwitterIcon />
            </Link>
          </div>
        </div>
        <div className="teamMember">
          <div className="memberImage">
            <img
              src="https://images.unsplash.com/photo-1572651198362-377a3298e433?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
              alt=""
            />
          </div>
          <div className="memberInfo">
            <h4>Nana Osei Bonsu</h4>
            <p>Head of IT</p>
          </div>
          <div className="memberSocials">
            <Link to={"#"}>
              <FacebookIcon />
            </Link>
            <Link to={"#"}>
              <InstagramIcon />
            </Link>
            <Link to={"#"}>
              <TwitterIcon />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
