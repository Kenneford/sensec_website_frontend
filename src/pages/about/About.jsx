import React from "react";
import "./about.scss";
import Banner from "../../components/aboutSection/banner/Banner";
import WhoWeAre from "../../components/aboutSection/aboutWhoWeAre/WhoWeAre";
import OurVision from "../../components/aboutSection/aboutOurVision/OurVision";
import OurHistory from "../../components/aboutSection/aboutOurHistory/OurHistory";
import Acheivements from "../../components/aboutSection/aboutAcheivements/Acheivements";
import Team from "../../components/aboutSection/aboutTeam/Team";

export default function About() {
  return (
    <div className="about" id="about">
      {/* <NavBar /> */}
      <Banner />
      <WhoWeAre />
      <OurVision />
      <OurHistory />
      <Acheivements />
      <Team />
      {/* <Footer /> */}
    </div>
  );
}
