import React, { useEffect, useState } from "react";
import "./allNotices.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  fetchSinglePost,
  getAllPosts,
} from "../../features/posts/postSlice";
import { MoreVert } from "@mui/icons-material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useLocation } from "react-router-dom";
import { getStaffInfo } from "../../features/staff/staffSlice";
import { getStudentInfo } from "../../features/student/studentsSlice";
import PostOptions from "../postOptions/PostOptions";
import NoticeItem from "./noticeItem/NoticeItem";

export default function AllNotices({
  toast,
  openSidebar,
  setPostOptions,
  postOptions,
  clearLogOptions,
}) {
  const { postFetchingStatus, deletePostStatus, error, success } = useSelector(
    (state) => state.post
  );
  const authStaffInfo = useSelector(getStaffInfo);
  const studentInfo = useSelector(getStudentInfo);
  const dispatch = useDispatch();
  const allPosts = useSelector(getAllPosts);
  console.log(allPosts);

  const userInfo = authStaffInfo || studentInfo;
  // const [postOptions, setPostOptions] = useState(false);
  console.log(postOptions);
  const user = true;
  const post = true;
  const likeHandler = () => {
    // try {
    //   axios.put(`/posts/${post._id}/like`, {
    //     userId: currentUser._id,
    //   });
    // } catch (err) {}
    // setLike(isLiked ? like - 1 : like + 1);
    // setIsLiked(!isLiked);
  };
  // const [open, setOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, location.key]);

  useEffect(() => {
    if (postFetchingStatus === "rejected") {
      error.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
    }
    if (deletePostStatus === "success") {
      toast.success(success, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
      // window.location.reload();
    }
  }, [error, success, postFetchingStatus, deletePostStatus, toast]);

  return (
    <div className="postGrid" id="generalNotice">
      {allPosts.map((post) => (
        <NoticeItem
          key={post._id}
          post={post}
          openSidebar={openSidebar}
          setPostOptions={setPostOptions}
          postOptions={postOptions}
          clearLogOptions={clearLogOptions}
        />
      ))}
    </div>
  );
}
