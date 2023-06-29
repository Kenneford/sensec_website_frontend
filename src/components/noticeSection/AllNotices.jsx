import React, { useEffect } from "react";
import "./allNotices.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getAllPosts } from "../../features/posts/postSlice";
import { MoreVert } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { getStaffInfo } from "../../features/staff/staffSlice";
export default function AllNotices({ toast }) {
  const { postFetchingStatus, error, success, posts } = useSelector(
    (state) => state.post
  );
  const authStaffInfo = useSelector(getStaffInfo);
  const dispatch = useDispatch();
  const allPosts = useSelector(getAllPosts);
  console.log(allPosts);

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

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (postFetchingStatus === "rejected") {
      error.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (postFetchingStatus === "success") {
      toast.success(success, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [error, success, postFetchingStatus, toast]);
  return (
    <div className="postGrid">
      {allPosts.map((post) => (
        <div className="post" key={post._id}>
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <p>Posted by:</p>
                <Link to="#" className="postBy">
                  <span className="postUsername">{post.postedBy}</span>
                  <img
                    className="postProfileImg"
                    src={authStaffInfo.profilePicture}
                    // src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
                    alt=""
                  />
                </Link>
                {/* <span className="postDate">12 mins ago</span> */}
                <span className="postDate">{post.createdAt}</span>
                {/* <span className="postDate">{post.date}</span> */}
              </div>
              {!authStaffInfo && (
                <div className="postTopRight">
                  <MoreVert />
                </div>
              )}
            </div>
            <div className="postCenter">
              {/* <span className="postText">It's me</span> */}
              <span className="postText">{post.title}</span>
              {/* <img
            className="postImg"
            src="/assets/profileImg/prfImg1.jpg"
            alt=""
          /> */}
              {/* <img className="postImg" src={post.photo} alt="" /> */}
              <img className="postImg" src={post.postImage} alt="" />
              <p>{post.text}</p>
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <img
                  className="likeIcon"
                  src="/assets/like.png"
                  // src={`like.png`}
                  //   onClick=""
                  onClick={likeHandler}
                  alt=""
                />
                <img
                  className="likeIcon"
                  src="/assets/heart.png"
                  // src={`heart.png`}
                  //   onClick=""
                  onClick={likeHandler}
                  alt=""
                />
                {/* <span className="postLikeCounter">5 people like it</span> */}
                <span className="postLikeCounter">
                  {post.like} people like it
                </span>
              </div>
              <div className="postBottomRight">
                {/* <span className="postCommentText">6 comments</span> */}
                <span className="postCommentText">{post.comment} comments</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
