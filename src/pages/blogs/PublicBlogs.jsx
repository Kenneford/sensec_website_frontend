import React, { useEffect, useRef, useState } from "react";
import { MoreVert } from "@mui/icons-material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
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
import PropTypes from "prop-types";
import { HashLink } from "react-router-hash-link";

export default function PublicBlogs({ post }) {
  const navigate = useNavigate();

  const allPosts = useSelector(getAllPosts);
  //   const selectedPost = allPosts.find((pst) => pst._id === post._id);

  // Function to preserve current pagination page on page reload
  const pageInView = localStorage.getItem("BlogPageNumber")
    ? localStorage.getItem("BlogPageNumber")
    : 1;
  localStorage.setItem("BlogPageNumber", pageInView);

  const [currentPage, setCurrentPage] = useState(pageInView);
  const blogPerPage = 1;
  const currentPageIndex = currentPage * blogPerPage;
  const prevPageIndex = currentPageIndex - blogPerPage;
  const nextPageIndex = currentPageIndex + blogPerPage;
  const blogData = allPosts.slice(prevPageIndex, currentPageIndex);
  const totalPages = Math.ceil(allPosts.length / blogPerPage);
  const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);
  console.log(totalPages);

  //Go to previous page
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
    localStorage.setItem("PageNumber", currentPage - 1);
  };
  //Go to next page
  const nextPage = (id) => {
    console.log(id);
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
    localStorage.setItem("PageNumber", id);
  };
  //Go to pagination number page
  const changeCurrentPage = (id) => {
    setCurrentPage(id);
    localStorage.setItem("PageNumber", id);
  };

  //Stay on current blog on page reload
  useEffect(() => {
    setCurrentPage(currentPageIndex);
  }, [currentPageIndex]);

  const scrollWithOffset1 = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = -200;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  return (
    <>
      {blogData.map((blog) => (
        <div className="blogs" id="blogs" key={blog.title}>
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <p>Posted by:</p>
                <Link to="#" className="postBy">
                  <span className="postUsername">{blog?.postedBy}</span>
                  <img
                    className="postProfileImg"
                    src={blog?.senderImage}
                    // src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
                    alt=""
                  />
                </Link>
                {/* <span className="postDate">12 mins ago</span> */}
                <span className="postDate">
                  {format(new Date(blog.createdAt), "dd-MM-yyyy")}
                </span>
                {/* <span className="postDate">{post.date}</span> */}
              </div>
            </div>
            <div
              className="postCenter"
              onClick={() =>
                navigate(`/sensec/blogs/blog_overview/${blog?.title}`)
              }
            >
              {/* <span className="postText">It's me</span> */}
              <span className="postTitle">{blog?.title}</span>
              {/* <img
            className="postImg"
            src="/assets/profileImg/prfImg1.jpg"
            alt=""
          /> */}
              {/* <img className="postImg" src={post.photo} alt="" /> */}
              <img className="postImg" src={blog?.postImage} alt="" />
              <p className="postText">{Parser(blog?.text)}</p>
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <button className="likeBtn">
                  <ThumbUpOffAltIcon className="isLiked" />
                </button>
                <button className="loveBtn">
                  <FavoriteBorderIcon className="isLoved" />
                </button>
              </div>
              <div className="postBottomRight">
                {/* <span className="postCommentText">6 comments</span> */}
                <span className="postCommentText">
                  {blog?.comment}17 comments
                </span>
              </div>
            </div>
            <div className="nextSeries">
              <span>
                <button
                  className={
                    prevPageIndex !== 0 ? "previous" : "disablePrevBtn"
                  }
                  onClick={prevPage}
                >
                  <KeyboardArrowLeftIcon className="prevIcon" />
                  <p>Prev-Ep</p>
                </button>
              </span>
              {pageNumbers.map((n) => (
                <HashLink
                  to={"/sensec/blogs#blogs"}
                  key={n}
                  smooth
                  scroll={scrollWithOffset1}
                >
                  <button
                    className={currentPage === n ? "activeEpisode" : ""}
                    onClick={() => changeCurrentPage(n)}
                  >
                    {n}
                  </button>
                </HashLink>
              ))}
              <span>
                <button
                  className={
                    currentPageIndex !== totalPages ? "next" : "disableNextBtn"
                  }
                  onClick={() => nextPage(currentPage + 1)}
                  // disabled={currentPageIndex === totalPages}
                >
                  <p>Next-Ep</p>
                  {/* <KeyboardArrowRightIcon cl----------ssName="nextIcon" /> */}
                </button>
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
