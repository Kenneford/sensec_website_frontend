import React, { useEffect, useState } from "react";
import "./dashboardContent.scss";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PersonIcon from "@mui/icons-material/Person";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TvIcon from "@mui/icons-material/Tv";
import { CircularProgress } from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import DashBoardFooter from "../../footer/DashBoardFooter";
import { useDispatch, useSelector } from "react-redux";
import { adminPost } from "../../../features/posts/postSlice";
import { getStaffInfo } from "../../../features/staff/staffSlice";

export default function DashboardContent({ toast }) {
  const authStaffInfo = useSelector(getStaffInfo);
  const { postStatus } = useSelector((state) => state.post);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = `${authStaffInfo.firstName} ${authStaffInfo.lastName}`;
  const [post, setPost] = useState({
    adminKey: authStaffInfo.adminSecret,
    postImage: "",
    postedBy: `${name}`,
    title: "",
    text: "",
  });
  const [adminKey, setAdminKey] = useState(authStaffInfo.adminSecret);
  const [loadPostImage, setLoadPostImage] = useState("");
  const [postedBy, setPostedBy] = useState(name);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  console.log(name);

  const fileTransform = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setLoadPostImage(reader.result);
      };
    } else {
      setLoadPostImage("");
    }
  };

  const handleImageFileUpload = (e) => {
    if (e.target.files.length !== 0) {
      setPost({ ...post, [e.target.name]: e.target.files[0] });
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLoadPostImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleInputValues = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendPost = (e) => {
    e.preventDefault();
    const { adminKey, title, text, postedBy } = post;
    console.log(post);
    const formData = new FormData();
    formData.append("adminKey", adminKey);
    formData.append("postImage", loadPostImage);
    formData.append("title", title);
    formData.append("text", text);
    formData.append("postedBy", postedBy);
    dispatch(
      adminPost(formData)
      // adminPost({
      //   adminKey,
      //   postImage: loadPostImage,
      //   title,
      //   text,
      //   postedBy,
      // })
    );
    setLoadPostImage("");
    setTitle("");
    setText("");

    // window.location.reload();
  };

  return (
    <div>
      <h1>Admins Dashboard</h1>
      <div className="content">
        <div className="dashBoardContent">
          <div
            className="teachers"
            onClick={() => navigate("/sensec/admin/all_teachers")}
          >
            <h3>Total Teachers</h3>
            <div className="teachersInfo">
              <div className="teachersInfoIcons">
                <PanoramaOutlinedIcon className="tvIcon" />
                <PersonIcon
                  style={{
                    backgroundColor: "#292929",
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
          <div
            className="teachers"
            onClick={() => {
              navigate("/sensec/admin/all_students");
            }}
          >
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
          <div
            className="teachers"
            onClick={() => navigate("/sensec/admin/students_fees")}
          >
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
          <div
            className="teachers"
            onClick={() => navigate("/sensec/admin/public_notice")}
          >
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
        <div className="noticeBox">
          <div className="noticeCont">
            <div className="h3Cont">
              <h3>POST A NOTICE</h3>
            </div>
            <div className="inputFields">
              <form onSubmit={handleSendPost}>
                <div className="postImageFileUpload">
                  <div className="file">
                    <label htmlFor="postImage" className="postImageUpload">
                      {loadPostImage ? (
                        <img className="postImg" src={loadPostImage} alt="" />
                      ) : (
                        <div className="postImgIcon">
                          <div className="postImgIconWrap">
                            <AddAPhotoIcon />
                            <p>Add an image</p>
                          </div>
                        </div>
                      )}
                    </label>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      onChange={handleImageFileUpload}
                      name="postImage"
                      id="postImage"
                      accept=".png,.jpeg,.jpg"
                    />
                  </div>
                  {/* <img
                    src="https://images.unsplash.com/photo-1609566193600-63a2c3e503df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt=""
                  /> */}
                </div>
                <div className="content">
                  <div className="title">
                    <span>Title</span>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      placeholder=""
                      className="titleText"
                      onChange={handleInputValues}
                      // onChange={(e) => setTitle(e.target.value)}
                      // value={title}
                    />
                  </div>
                  <div className="title">
                    <span>Message</span>
                    <textarea
                      type="text"
                      name="text"
                      id="text"
                      placeholder=""
                      className="textArea"
                      onChange={handleInputValues}
                      // onChange={(e) => setText(e.target.value)}
                      // value={text}
                    />
                  </div>
                  <button className="noticeBtn">
                    {postStatus === "pending" ? (
                      <CircularProgress
                        style={{ color: "white", size: "20px" }}
                      />
                    ) : (
                      "Post Notice"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <DashBoardFooter /> */}
    </div>
  );
}
