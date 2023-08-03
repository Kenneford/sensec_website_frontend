import React, { useEffect, useState } from "react";
import { MoreVert } from "@mui/icons-material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getStaffInfo } from "../../../features/staff/staffSlice";
import { getStudentInfo } from "../../../features/student/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PostOptions from "../../postOptions/PostOptions";
import { getAllPosts, likePost } from "../../../features/posts/postSlice";
import { compareAsc, format, formatDistance, subDays } from "date-fns";
import { API_ENDPOINT } from "../../../apiEndPoint/api";
import axios from "axios";
import { getAdminInfo } from "../../../features/admin/adminsSlice";
import { getTeacherInfo } from "../../../features/teacher/teachersSlice";

export default function NoticeItem({
  post,
  // setPostOptions,
  // postOptions,
  openSidebar,
}) {
  const authStaffInfo = useSelector(getStaffInfo);
  const studentInfo = useSelector(getStudentInfo);
  const authAdminInfo = useSelector(getAdminInfo);
  const authTeacherInfo = useSelector(getTeacherInfo);
  const userInfo =
    authStaffInfo || studentInfo || authAdminInfo || authTeacherInfo;
  const allPosts = useSelector(getAllPosts);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [love, setLove] = useState(post.likes.length);
  const [isLoved, setIsLoved] = useState(false);
  const [postOptions, setPostOptions] = useState(false);

  console.log(userInfo);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   console.log(post);

  const handlePostLike = async (id) => {
    if (userInfo) {
      try {
        await axios.put(`${API_ENDPOINT}/admins/posts/like_post/${post._id}`, {
          userId: userInfo.id,
        });
      } catch (error) {
        console.error(error);
      }
      // dispatch(likePost({ userId: userInfo.id, postId: post._id }));
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } else {
      return;
    }
  };
  useEffect(() => {
    setIsLiked(post.likes.includes(userInfo.id));
  }, [userInfo.id, post.likes]);
  return (
    <div className="post" key={post._id}>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <p>Posted by:</p>
            <Link to="#" className="postBy">
              <span className="postUsername">{post.postedBy}</span>
              <img
                className="postProfileImg"
                src={post.senderImage}
                // src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
                alt=""
              />
            </Link>
            {/* <span className="postDate">12 mins ago</span> */}
            <span className="postDate">
              {format(new Date(post.createdAt), "dd-MM-yyyy")}
            </span>
            {/* <span className="postDate">{post.date}</span> */}
          </div>
          {userInfo.isAdmin && (
            <div>
              <div
                className="postTopRight"
                onClick={() => setPostOptions(!postOptions)}
              >
                <MoreVert className="moreVert" />
              </div>
              {postOptions && (
                <PostOptions
                  key={post._id}
                  openSidebar={openSidebar}
                  postOptions={postOptions}
                  post={post}
                  userInfo={userInfo.id}
                />
              )}
            </div>
          )}
        </div>
        <div
          className="postCenter"
          onClick={() => navigate(`/sensec/general_announcement/${post.title}`)}
        >
          {/* <span className="postText">It's me</span> */}
          <span className="postTitle">{post.title}</span>
          {/* <img
            className="postImg"
            src="/assets/profileImg/prfImg1.jpg"
            alt=""
          /> */}
          {/* <img className="postImg" src={post.photo} alt="" /> */}
          <img className="postImg" src={post.postImage} alt="" />
          <p className="postText">{post.text}</p>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <button
              className="likeBtn"
              onClick={() => handlePostLike(userInfo.id)}
            >
              {!isLiked ? <ThumbUpOffAltIcon /> : <ThumbUpAltIcon />}
            </button>
            <button className="likeBtn">
              {!isLoved ? <FavoriteBorderIcon /> : <FavoriteIcon />}
            </button>
            {/* <span className="postLikeCounter">5 people like it</span> */}
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            {/* <span className="postCommentText">6 comments</span> */}
            <span className="postCommentText">{post.comment}17 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
