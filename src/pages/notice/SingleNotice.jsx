import React, { useEffect, useState } from "react";
import "./singleNotice.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchSinglePost,
  getAllPosts,
  getSinglePost,
} from "../../features/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { getStaffInfo } from "../../features/staff/staffSlice";

export default function SingleNotice() {
  const authStaffInfo = useSelector(getStaffInfo);
  const allPosts = useSelector(getAllPosts);
  const singlePost = useSelector(getSinglePost);
  const [postSelected, setPostSelected] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(postId);
  console.log(singlePost);

  // console.log(getSelectedPost);

  useEffect(() => {
    dispatch(fetchSinglePost(postId));
  }, [dispatch, allPosts, postId]);

  return (
    <div className="singlePostWrap">
      <div
        className="singlePostBgImg"
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
