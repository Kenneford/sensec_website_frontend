import React, { useEffect, useState } from "react";
import "./singleBlog.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStaffInfo } from "../../features/staff/staffSlice";
import {
  fetchSinglePost,
  getAllPosts,
  getSinglePost,
} from "../../features/posts/postSlice";
import Parser from "html-react-parser";
const { htmlToText } = require("html-to-text");

export default function SingleBlog() {
  const authStaffInfo = useSelector(getStaffInfo);
  const allPosts = useSelector(getAllPosts);
  const singlePost = useSelector(getSinglePost);
  const [postSelected, setPostSelected] = useState(singlePost);
  const { blogId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(blogId);
  console.log(singlePost);
  console.log(postSelected);

  // console.log(getSelectedPost);

  useEffect(() => {
    setPostSelected(singlePost);
  }, [singlePost]);
  useEffect(() => {
    dispatch(fetchSinglePost(blogId));
  }, [dispatch, allPosts, blogId]);

  return (
    <div className="singleBlogWrap">
      <h1>{singlePost.title}</h1>
      <div
        className="singleBlogBgImg"
        style={{
          backgroundImage: `url(${singlePost.postImage})`,
          // width: "40rem",
          // height: "20rem",
        }}
      >
        <div className="colorOverlay"></div>
      </div>
      <div className="sendername">
        <p>By: {singlePost.postedBy}</p>
        <img src={singlePost.senderImage} alt="" />
      </div>
      {/* <img src={singlePostpostImage} alt="" /> */}
      <p className="singlePostText">{singlePost && Parser(singlePost.text)}</p>
    </div>
  );
}
