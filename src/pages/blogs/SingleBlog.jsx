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

export default function SingleBlog() {
  const authStaffInfo = useSelector(getStaffInfo);
  const allPosts = useSelector(getAllPosts);
  const singlePost = useSelector(getSinglePost);
  const [postSelected, setPostSelected] = useState("");
  const { blogId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(blogId);
  console.log(singlePost);

  // console.log(getSelectedPost);

  useEffect(() => {
    dispatch(fetchSinglePost(blogId));
  }, [dispatch, allPosts, blogId]);

  return (
    <div className="singleBlogWrap">
      <div
        className="singleBlogBgImg"
        style={{
          backgroundImage: `url(${singlePost.postImage})`,
        }}
      >
        <h1 className="colorOverlay">{singlePost.title}</h1>
      </div>
      <div className="sendername">
        <p>By: {singlePost.postedBy}</p>
        <img src={singlePost.senderImage} alt="" />
      </div>
      {/* <img src={singlePostpostImage} alt="" /> */}
      <p className="singlePostText">{singlePost.text}</p>
    </div>
  );
}
