import React, { useEffect, useState } from "react";
// import "./dashboardContent.scss";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { CircularProgress } from "@mui/material";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  adminPost,
  fetchSinglePost,
  getAllPosts,
  getSinglePost,
  updatePost,
} from "../../../features/posts/postSlice";
import { getStaffInfo } from "../../../features/staff/staffSlice";
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

export default function UpdatePost({ toast }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStaffInfo = useSelector(getStaffInfo);
  const { postStatus } = useSelector((state) => state.post);
  const allPosts = useSelector(getAllPosts);
  const singlePost = useSelector(getSinglePost);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);
  console.log(convertedContent);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  const { postId } = useParams();
  const selectedPost = allPosts.find((post) => post._id === postId);

  const name = `${authStaffInfo.firstName} ${authStaffInfo.lastName}`;
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [post, setPost] = useState({
    senderImage: selectedPost?.senderImage,
    postImage: selectedPost?.postImage,
    postedBy: selectedPost?.postedBy,
    title: selectedPost?.title,
    text: selectedPost?.text,
  });
  const [loadPostImage, setLoadPostImage] = useState("");
  // console.log(name);
  console.log(text);

  const handleEditorText = () => {
    // const editor = reactQuillRef.getEditor();
    // const unprivilegedEditor = reactQuillRef.makeUnprivilegedEditor(editor);
    // // You may now use the unprivilegedEditor proxy methods
    // const inpText = unprivilegedEditor.getText();
    // console.log("unprivilegedEditor.getText()", unprivilegedEditor.getText());
    // setText(inpText);
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

  const handleInputValues = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

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
    dispatch(updatePost(formData));
    // setLoadPostImage("");
    // setText("");
    // setTitle("");
    // setPost({
    //   title: "",
    //   text: "",
    // });
  };

  useEffect(() => {
    dispatch(fetchSinglePost(postId));
  }, [dispatch, allPosts, postId]);

  return (
    <div>
      <h1>Admins Dashboard</h1>
      <div className="content">
        <div className="noticeBox">
          <div className="noticeCont">
            <div className="h3Cont">
              <h3>UPDATE A POST</h3>
            </div>
            <div className="inputFields">
              <form onSubmit={handleSendPost}>
                <div className="postImageFileUpload">
                  <div className="file">
                    <label htmlFor="postImage" className="postImageUpload">
                      {post.postImage ? (
                        <img className="postImg" src={post.postImage} alt="" />
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
                      value={post.title}
                    />
                  </div>
                  <div className="editor">
                    <span className="editorTitle">Message</span>
                    <ReactQuill
                      theme="snow"
                      value={post.text}
                      // onChange={handleEditorText}
                      onChange={setText}
                      className="textArea"
                      modules={modules}
                      // ref={(el) => {
                      //   reactQuillRef = el;
                      // }}
                      // readOnly={true}
                    />
                  </div>
                  {/* <div dangerouslySetInnerHTML={{ __html: text }} /> */}
                  <button className="noticeBtn">
                    {postStatus === "pending" ? (
                      <CircularProgress
                        style={{ color: "white", size: "20px" }}
                      />
                    ) : (
                      "Update Post"
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
