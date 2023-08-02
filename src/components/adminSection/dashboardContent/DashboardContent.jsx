import React, { useEffect, useState } from "react";
import "./dashboardContent.scss";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PersonIcon from "@mui/icons-material/Person";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { CircularProgress } from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminPost } from "../../../features/posts/postSlice";
import {
  fetchStaffs,
  fetchTeachers,
  getAllStaffs,
  getStaffInfo,
} from "../../../features/staff/staffSlice";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from "draft-js-to-html";

import ReactQuill, { reactQuillRef } from "react-quill";
import "react-quill/dist/quill.snow.css";
// import "react-quill/dist/quill.bubble.css";
import { modules } from "../../../options/options";
import { getAdminInfo } from "../../../features/admin/adminsSlice";
import {
  fetchStudents,
  getAllStudents,
} from "../../../features/student/studentsSlice";
import { getAllTeachers } from "../../../features/teacher/teachersSlice";

export default function DashboardContent({ toast }) {
  const allStudents = useSelector(getAllStudents);
  const allStaffs = useSelector(getAllStaffs);
  const allTeachers = useSelector(getAllTeachers);
  const authAdminInfo = useSelector(getAdminInfo);
  const { postStatus, success, error } = useSelector((state) => state.post);

  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );
  // const [convertedContent, setConvertedContent] = useState(null);

  // useEffect(() => {
  //   let html = convertToHTML(editorState.getCurrentContent());
  //   setConvertedContent(html);
  // }, [editorState]);
  // console.log(convertedContent);

  // function createMarkup(html) {
  //   return {
  //     __html: DOMPurify.sanitize(html),
  //   };
  // }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = `${authAdminInfo.firstName} ${authAdminInfo.lastName}`;
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [post, setPost] = useState({
    adminKey: authAdminInfo.adminSecret,
    senderImage: authAdminInfo.profilePicture,
    postImage: "",
    postedBy: `${name}`,
    title: "",
    text: "",
  });
  const [loadPostImage, setLoadPostImage] = useState("");

  // console.log(name);
  // console.log(text);

  const handleEditorText = () => {
    const editor = reactQuillRef.getEditor();
    const unprivilegedEditor = reactQuillRef.makeUnprivilegedEditor(editor);
    // You may now use the unprivilegedEditor proxy methods
    const inpText = unprivilegedEditor.getText();
    console.log("unprivilegedEditor.getText()", unprivilegedEditor.getText());
    setText(inpText);
  };

  const handleImageFileUpload = (e) => {
    if (e.target.files.length !== 0) {
      setPost({ ...post, [e.target.name]: e.target.files[0] });
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setLoadPostImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -120;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  // const handleInputValues = (e) => {
  //   setPost({
  //     ...post,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSendPost = (e) => {
    e.preventDefault();
    console.log(post);
    const formData = new FormData();
    formData.append("adminKey", post.adminKey);
    formData.append("postImage", post.postImage);
    formData.append("senderImage", post.senderImage);
    formData.append("title", title);
    formData.append("text", text);
    formData.append("postedBy", post.postedBy);
    dispatch(adminPost(formData));
    if (text && post && title) {
      setLoadPostImage("");
      setText("");
      setTitle("");
    }
  };

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
    dispatch(fetchStaffs());
  }, [dispatch]);

  useEffect(() => {
    if (postStatus === "rejected") {
      error.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
    }

    if (postStatus === "success") {
      toast.success(success, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [error, success, postStatus, toast]);

  setTimeout(() => {
    if (postStatus === "success") {
      navigate("/sensec/general_announcement/#generalNotice");
      window.location.reload();
    }
  }, 2000);
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
                <SupervisedUserCircleIcon
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="totalTeachers">{allTeachers.length}</div>
            </div>
            <div className="pending">
              <h4>Pending Teacher(s)</h4>
              <div className="pendingTeachers">2</div>
            </div>
          </div>
          <div
            className="teachers"
            onClick={() => {
              navigate("/sensec/admin/students");
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
              <div className="totalTeachers">{allStudents.length}</div>
            </div>
            <div className="pending">
              <h4>Pending Student(s)</h4>
              <div className="pendingTeachers">201</div>
            </div>
          </div>
          <div
            className="teachers"
            onClick={() => navigate("/sensec/admin/staff_members")}
          >
            <h3>Total Staff</h3>
            <div className="teachersInfo">
              <div className="teachersInfoIcons">
                <MoneyOutlinedIcon
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="totalTeachers">{allStaffs.length}</div>
            </div>
            <div className="pending">
              <h4>Pending Staff(s)</h4>
              <div className="pendingTeachers">7</div>
            </div>
          </div>
          <div
            className="teachers"
            onClick={() =>
              navigate("/sensec/general_announcement/#generalNotice")
            }
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
                      id="title"
                      placeholder=""
                      className="titleText"
                      name="title"
                      // onChange={handleInputValues}
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                  </div>
                  <div className="editor">
                    <span className="editorTitle">Message</span>
                    <ReactQuill
                      theme="snow"
                      value={text}
                      onChange={handleEditorText}
                      // onChange={setText}
                      className="textArea"
                      modules={modules}
                      ref={(el) => {
                        reactQuillRef = el;
                      }}
                      // readOnly={true}
                    />
                  </div>
                  {/* <div dangerouslySetInnerHTML={{ __html: text }} /> */}
                  <button
                    className="noticeBtn"
                    smooth
                    scroll={scrollWithOffset}
                  >
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
