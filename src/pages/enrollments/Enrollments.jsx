import React from "react";
import "./enrollments.scss";
import Banner from "../../components/enrollmentSection/banner/Banner";
import Enroll from "../../components/enrollmentSection/enroll/Enroll";

export default function Enrollments() {
  return (
    <div className="enrollmentWrap">
      <Banner />
      <Enroll />
    </div>
  );
}
