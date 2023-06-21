import React from "react";
import "./staffDashBoardContent.scss";
import PersonIcon from "@mui/icons-material/Person";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";

export default function StaffDashBoardContent() {
  return (
    <div>
      <h1>Staff Dashboard</h1>
      <div className="content">
        <div className="dashBoardContent">
          <div className="teachers">
            <h3>Total Teachers</h3>
            <div className="teachersInfo">
              <div className="teachersInfoIcons">
                <PanoramaOutlinedIcon className="tvIcon" />
                <PersonIcon
                  style={{
                    backgroundColor: "green",
                    zIndex: 1,
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="totalTeachers">34</div>
            </div>
            <div className="pending">
              <h4>Pending Teacher(s)</h4>
              <div className="pendingTeachers">2</div>
            </div>
          </div>
          <div className="teachers">
            <h3>Total Students</h3>
            <div className="teachersInfo">
              <div className="teachersInfoIcons">
                <SchoolOutlinedIcon
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="totalTeachers">9,544</div>
            </div>
            <div className="pending">
              <h4>Pending Student(s)</h4>
              <div className="pendingTeachers">201</div>
            </div>
          </div>
          <div className="teachers">
            <h3>Total Fees</h3>
            <div className="teachersInfo">
              <div className="teachersInfoIcons">
                <MoneyOutlinedIcon
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="totalTeachers">GH₵ 34,857.72</div>
            </div>
            <div className="pending">
              <h4>Pending Fees</h4>
              <div className="pendingTeachers">GH₵ 17,273.93</div>
            </div>
          </div>
          <div className="teachers">
            <div className="titleFlex">
              <h3>General Notice</h3>
              <p>Year 2023</p>
            </div>
            <div className="teachersInfo">
              <div className="teachersInfoIcons">
                <CampaignOutlinedIcon
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="totalTeachers">34</div>
            </div>
            <div className="pending">
              <h4>Old Notice</h4>
              <div className="pendingTeachers">/ 2023</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
