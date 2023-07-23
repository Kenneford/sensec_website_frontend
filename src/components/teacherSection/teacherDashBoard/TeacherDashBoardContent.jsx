import React from "react";
import "./teacherDashBoardContent.scss";
import PersonIcon from "@mui/icons-material/Person";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

export default function TeacherDashBoardContent() {
  return (
    <div>
      <h1>Teachers Dashboard</h1>
      <div className="content">
        <div className="dashBoardContent">
          <div className="teachers">
            <h3>Total Teachers</h3>
            <div className="teachersInfo">
              <div className="teachersInfoIcons">
                <SupervisedUserCircleIcon
                  style={{
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
            <h3>Total Staff Members</h3>
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
            <h3>Total Course Students</h3>
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
              <h4>Pending Students</h4>
              <div className="pendingTeachers">GH₵ 17,273.93</div>
            </div>
          </div>
          <div className="teachers">
            <div className="titleFlex">
              <h3>Public Notice</h3>
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
