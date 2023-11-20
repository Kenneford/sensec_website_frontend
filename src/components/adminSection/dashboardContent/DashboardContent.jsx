import React, { useEffect, useState, useRef } from "react";
import "./dashboardContent.scss";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { CircularProgress } from "@mui/material";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Parser from "html-react-parser";
import {
  adminPost,
  fetchPosts,
  getAllPosts,
} from "../../../features/posts/postSlice";
import {
  fetchStaffs,
  getAllStaffs,
  getStaffInfo,
} from "../../../features/staff/staffSlice";
// import { formats, modules } from "../../../options/options";
import { getAdminInfo } from "../../../features/admin/adminsSlice";
import {
  fetchPendingStudents,
  fetchStudents,
  getAllPendingStudents,
  getAllStudents,
} from "../../../features/student/studentsSlice";
import {
  fetchTeachers,
  getAllTeachers,
} from "../../../features/teacher/teachersSlice";
import { Editor } from "@tinymce/tinymce-react";

export default function DashboardContent({ toast }) {
  const tinyMCEKey = process.env.REACT_APP_TINYMCE_KEY;
  const allStudents = useSelector(getAllStudents);
  const allPendingStudents = useSelector(getAllPendingStudents);
  const allStaffs = useSelector(getAllStaffs);
  const allTeachers = useSelector(getAllTeachers);
  const authAdminInfo = useSelector(getAdminInfo);
  const allPosts = useSelector(getAllPosts);
  const { postStatus, success, error } = useSelector((state) => state.post);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminUniqueId } = useParams();

  const name = `${authAdminInfo.firstName} ${authAdminInfo.lastName}`;
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [post, setPost] = useState({
    adminKey: authAdminInfo.adminSecret,
    senderImage: authAdminInfo.profilePicture,
    postImage: "",
    postedBy: `${name}`,
    title: "",
    text: "",
  });
  const [loadPostImage, setLoadPostImage] = useState("");
  const [teachers, setTeachers] = useState(allTeachers);

  const editorRef = useRef(null);
  // console.log(name);
  // console.log(text);

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
    console.log(postBody);
    const formData = new FormData();
    formData.append("adminKey", post.adminKey);
    formData.append("postImage", post.postImage);
    formData.append("senderImage", post.senderImage);
    formData.append("title", title);
    formData.append("text", postBody);
    formData.append("postedBy", post.postedBy);
    dispatch(adminPost(formData));
    if (text && post && title) {
      setLoadPostImage("");
      setText("");
      setTitle("");
    }
  };

  useEffect(() => {
    setTeachers(teachers);
  }, [teachers]);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchPendingStudents());
    dispatch(fetchTeachers());
    dispatch(fetchStaffs());
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (postStatus === "pending") {
      setTimeout(() => {
        return <div>Loading</div>;
      }, 6000);
    }
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

  // setTimeout(() => {
  //   if (postStatus === "success") {
  //     navigate("/sensec/general_announcement/#generalNotice");
  //     window.location.reload();
  //   }
  // }, 3000);
  return (
    <div id="adminDashBoard">
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
                  titleAccess="All Employed Teachers"
                />
              </div>
              <div className="totalTeachers">{allTeachers.length}</div>
            </div>
            <div className="pending">
              <h4>Pending Teacher(s)</h4>
              <div className="pendingTeachers">2</div>
            </div>
          </div>
          <div className="teachers">
            <h3>Total Students</h3>
            <div
              className="teachersInfo"
              onClick={() => {
                navigate("/sensec/admin/students");
              }}
            >
              <div className="teachersInfoIcons">
                <SchoolOutlinedIcon
                  style={{
                    fontSize: "2rem",
                  }}
                  titleAccess="All Enrolled Students"
                />
              </div>
              <div className="totalTeachers">{allStudents.length}</div>
            </div>
            <div
              className="pending"
              onClick={() => {
                navigate(
                  `/sensec/admin/${authAdminInfo.adminId}/all_pending_students`
                );
              }}
            >
              <h4>Pending Student(s)</h4>
              <div className="pendingTeachers">{allPendingStudents.length}</div>
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
                  titleAccess="All Employed NT Staffs"
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
              <div className="totalTeachers">{allPosts.length}</div>
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
                    <h5 className="titleName">Title</h5>
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
                    <h5 className="editorTitle">Messages</h5>
                    {/* Editor Here */}
                    <div className="editorBox">
                      <Editor
                        apiKey={tinyMCEKey}
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        //   initialValue="<p>Write something here...</p>"
                        onEditorChange={(newText) => {
                          setPostBody(newText);
                        }}
                        init={{
                          height: 300,
                          // width: 500,
                          menubar: true,
                          // menu: {
                          //   favs: {
                          //     title: "My Favorites",
                          //     items: "code visualaid | searchreplace | emoticons",
                          //   },
                          // },
                          plugins: [
                            "advlist",
                            "autolink",
                            "link",
                            "image",
                            "lists",
                            "charmap",
                            "preview",
                            "anchor",
                            "pagebreak",
                            "searchreplace",
                            "wordcount",
                            "visualblocks",
                            "visualchars",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "emoticons",
                            "template",
                            "help",
                            "linkchecker",
                          ],
                          toolbar:
                            "undo redo | blocks | " +
                            "bold italic forecolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                            "removeformat | help",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                          style_formats: [
                            {
                              title: "Blocks",
                              items: [
                                { title: "Div", format: "div" },
                                { title: "Pre", format: "pre" },
                              ],
                            },
                          ],
                        }}
                      />
                    </div>
                  </div>
                  {/* <div className="viewPost">{Parser(postBody)}</div> */}
                  <button
                    className="noticeBtn"
                    smooth
                    scroll={scrollWithOffset}
                    type="submit"
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
    </div>
  );
}
