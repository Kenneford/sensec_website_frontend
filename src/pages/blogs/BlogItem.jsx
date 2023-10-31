import React, { useEffect, useRef, useState } from "react";
import { MoreVert } from "@mui/icons-material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getStaffInfo } from "../../features/staff/staffSlice";
import { getStudentInfo } from "../../features/student/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PostOptions from "../../components/postOptions/PostOptions";
import { getAllPosts, likePost } from "../../features/posts/postSlice";
import { compareAsc, format, formatDistance, subDays } from "date-fns";
import { API_ENDPOINT } from "../../apiEndPoint/api";
import axios from "axios";
import { getAdminInfo } from "../../features/admin/adminsSlice";
import { getTeacherInfo } from "../../features/teacher/teachersSlice";
import Parser from "html-react-parser";

export default function BlogItem({
  post,
  // setPostOptions,
  // postOptions,
  openSidebar,
  toast,
}) {
  const authStaffInfo = useSelector(getStaffInfo);
  const studentInfo = useSelector(getStudentInfo);
  const authAdminInfo = useSelector(getAdminInfo);
  const authTeacherInfo = useSelector(getTeacherInfo);
  const userInfo =
    authStaffInfo || studentInfo || authAdminInfo || authTeacherInfo;
  const allPosts = useSelector(getAllPosts);
  const selectedPost = allPosts.find((pst) => pst._id === post._id);
  const [like, setLike] = useState(post.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [love, setLove] = useState(post.loves?.length);
  const [isLoved, setIsLoved] = useState(false);
  const [postOptions, setPostOptions] = useState(false);
  console.log(studentInfo);
  console.log(selectedPost);

  const reactions = like + love;
  console.log(reactions);

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handlePostLike = async (id) => {
    if (!userInfo) {
      toast.error("Please login first to react to this post!", {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
    if (authAdminInfo && !post.loves.includes(authAdminInfo.id)) {
      try {
        await axios.put(`${API_ENDPOINT}/admins/posts/like_post/${post._id}`, {
          userId: authAdminInfo.id,
        });
      } catch (error) {
        console.error(error);
      }
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } else if (post.loves.includes(authAdminInfo.id)) {
      toast.error("Post already loved!", {
        position: "top-right",
        theme: "dark",
      });
      return;
    }
    if (studentInfo.id && !post.loves.includes(studentInfo.id)) {
      try {
        await axios.put(`${API_ENDPOINT}/admins/posts/like_post/${post._id}`, {
          userId: studentInfo.id,
        });
      } catch (error) {
        console.error(error);
      }
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } else if (post.loves.includes(studentInfo.id)) {
      toast.error("Post already loved!", {
        position: "top-right",
        theme: "dark",
      });
      return;
    }
  };
  const handlePostLove = async (id) => {
    if (!userInfo) {
      toast.error("Please login first to react to this post!", {
        position: "top-right",
        theme: "dark",
      });
    }
    if (authAdminInfo && !post.likes.includes(authAdminInfo.id)) {
      try {
        await axios.put(`${API_ENDPOINT}/admins/posts/love_post/${post._id}`, {
          userId: authAdminInfo.id,
        });
      } catch (error) {
        console.error(error);
      }
      // dispatch(likePost({ userId: userInfo.id, postId: post._id }));
      setLove(isLoved ? love - 1 : love + 1);
      setIsLoved(!isLoved);
    } else if (post.likes.includes(authAdminInfo.id)) {
      toast.error("Post already liked!", {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
      return;
    }
    if (studentInfo && !post.likes.includes(studentInfo.id)) {
      try {
        await axios.put(`${API_ENDPOINT}/admins/posts/love_post/${post._id}`, {
          userId: studentInfo.id,
        });
      } catch (error) {
        console.error(error);
      }
      setLove(isLoved ? love - 1 : love + 1);
      setIsLoved(!isLoved);
    } else if (post.likes.includes(studentInfo.id)) {
      toast.error("Post already liked!", {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
      return;
    }
  };
  useEffect(() => {
    setIsLiked(post.likes.includes(authAdminInfo.id || studentInfo.id));
    setIsLoved(post.loves.includes(authAdminInfo.id || studentInfo.id));
    document.addEventListener("click", hideOnClickOutside, true);
  }, [authAdminInfo.id, studentInfo.id, post.likes, post.loves]);

  const outSideClickRef = useRef(null);
  const hideOnClickOutside = (e) => {
    // console.log(outSideClickRef.current);
    if (
      outSideClickRef.current &&
      !outSideClickRef.current.contains(e.target)
    ) {
      setPostOptions(false);
    }
  };
  return (
    <div className="post" id="blogs" key={post._id}>
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
              <div ref={outSideClickRef}>
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
            </div>
          )}
        </div>
        <div
          className="postCenter"
          onClick={() => navigate(`/sensec/blogs/blog_overview/${post.title}`)}
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
          <p className="postText">{Parser(post.text)}</p>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <button
              className="likeBtn"
              onClick={() => {
                authAdminInfo && handlePostLike(authAdminInfo.id);
                studentInfo && handlePostLike(studentInfo.id);
              }}
            >
              {!isLiked ? (
                <ThumbUpOffAltIcon className="isLiked" />
              ) : (
                <ThumbUpAltIcon className="isLiked" />
              )}
            </button>
            <button
              className="loveBtn"
              onClick={() => {
                authAdminInfo && handlePostLove(authAdminInfo.id);
                studentInfo && handlePostLove(studentInfo.id);
              }}
            >
              {!isLoved ? (
                <FavoriteBorderIcon className="isLoved" />
              ) : (
                <FavoriteIcon className="isLoved" />
              )}
            </button>
            {authAdminInfo && (
              <span className="postLikeCounter">
                {reactions === 1 &&
                  post.likes.includes(authAdminInfo.id) &&
                  !post.loves.includes(authAdminInfo.id) &&
                  "you reacted"}
                {reactions === 1 &&
                  post.loves.includes(authAdminInfo.id) &&
                  !post.likes.includes(authAdminInfo.id) &&
                  "you reacted"}
                {reactions === 1 &&
                  !post.likes.includes(authAdminInfo.id) &&
                  !post.loves.includes(authAdminInfo.id) &&
                  `${like + love} person reacted`}
                {reactions > 1 &&
                  post.likes.includes(authAdminInfo.id) &&
                  !post.loves.includes(authAdminInfo.id) &&
                  `you and ${like + love - 1} other people reacted`}
                {reactions > 1 &&
                  post.loves.includes(authAdminInfo.id) &&
                  !post.likes.includes(authAdminInfo.id) &&
                  `you and ${like + love - 1} other people reacted`}
                {reactions > 1 &&
                  !post.likes.includes(authAdminInfo.id) &&
                  !post.loves.includes(authAdminInfo.id) &&
                  `${like + love} people reacted`}
              </span>
            )}
            {studentInfo && (
              <span className="postLikeCounter">
                {reactions === 1 &&
                  post.likes.includes(studentInfo.id) &&
                  "you reacted"}
                {reactions === 1 &&
                  post.loves.includes(studentInfo.id) &&
                  "you reacted"}
                {reactions > 1 &&
                  post.likes.includes(studentInfo.id) &&
                  `you and ${like + love - 1} other people reacted`}
                {reactions > 1 &&
                  post.loves.includes(studentInfo.id) &&
                  `you and ${like + love - 1} other people reacted`}
              </span>
            )}
            {!userInfo && (
              <span className="postLikeCounter">
                {like + love === 1 && `${like + love} person reacted`}
                {like + love > 1 && `${like + love} people reacted`}
                {!like && !love && "no reactions"}.
              </span>
            )}
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
