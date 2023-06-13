import React, { useState } from "react";
import "./footer.scss";
// import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-scroll";
import ChatIcon from "@mui/icons-material/Chat";
import TelegramIcon from "@mui/icons-material/Telegram";
import CloseIcon from "@mui/icons-material/Close";

export default function Footer() {
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }
  const [openChatBox, setOpenChatBox] = useState(false);
  console.log(openChatBox);

  const openChat = () => setOpenChatBox(!openChatBox);

  return (
    <div className="footer">
      <div className="footerWrap">
        <div className="footerCont">
          <div className="footerLogo">
            <h1>
              Sen<span>sec</span>
            </h1>
            <p>The Great Sensec!</p>
            <p>Forever Great!</p>
          </div>
          <div className="footerContent">
            <div className="pageLinks">
              <h3>Usefull Links</h3>
              <HashLink
                to={"/sensec/homepage/#homepage"}
                smooth
                scroll={scrollWithOffset}
              >
                Home
              </HashLink>
              <HashLink
                to={"/sensec/about/#about"}
                smooth
                scroll={scrollWithOffset}
              >
                About
              </HashLink>
              <HashLink
                to={"/sensec/courses/#courses"}
                smooth
                scroll={scrollWithOffset}
              >
                Courses
              </HashLink>
              <HashLink
                to={"/sensec/contact/#contact"}
                smooth
                scroll={scrollWithOffset}
              >
                Contact
              </HashLink>
            </div>
            <div className="policy">
              <h3>Legal Terms</h3>
              <HashLink to={"#"} smooth scroll={scrollWithOffset}>
                Privacy Policy
              </HashLink>
              <HashLink to={"#"} smooth scroll={scrollWithOffset}>
                Terms of Service
              </HashLink>
            </div>
            <div className="contactUs">
              <h3>Contact Us</h3>
              <div className="contactIcons">
                <span>
                  <LocalPhoneIcon style={{ color: "" }} />
                  +233 000 000 001
                </span>
                <span>
                  <WhatsAppIcon style={{ color: "rgb(25, 173, 30)" }} />
                  <p>+233 000 000 002</p>
                </span>
                <span>
                  <MailOutlineIcon style={{ color: "" }} />
                  <p>sensec@gmail.com</p>
                </span>
              </div>
              <div className="socials">
                <h3>Follow Us</h3>
                <div className="socialsIcons">
                  <span className="icon">
                    <FacebookIcon titleAccess="Facebook Link" />
                  </span>
                  <span className="icon">
                    <InstagramIcon titleAccess="Instagram Link" />
                  </span>
                  <span className="icon">
                    <LinkedInIcon titleAccess="LinkedIn Link" />
                  </span>
                  <span className="icon">
                    <TwitterIcon titleAccess="Twitter Link" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="chatIcon" onClick={openChat}>
        {!openChatBox ? (
          <ChatIcon
            style={{
              color: "#039e0f",
              marginRight: ".02rem",
            }}
            titleAccess="Open Chat"
          />
        ) : (
          <CloseIcon className="closeChatIcon" titleAccess="Close Chat" />
        )}
      </div>
      {openChatBox && (
        <div className="chatModal">
          <div className="msgBox">
            <p>This is a message!</p>
          </div>
          <div className="inputField">
            <input type="text" className="msgInput" />
            <TelegramIcon className="sendIcon" />
          </div>
        </div>
      )} */}
      <div className="rights">
        <p>
          Copyright &copy;2023 <span style={{ color: "#0fc80f" }}>Sen</span>
          <span style={{ color: "yellow" }}>sec</span>
        </p>
        <div
          style={{
            border: "1px solid #fff",
            height: "15px",
          }}
        ></div>
        <p>All Rights Reserved!</p>
      </div>
    </div>
  );
}
