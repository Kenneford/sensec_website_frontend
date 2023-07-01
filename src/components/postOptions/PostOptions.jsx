import React from "react";
import "./postOptions.scss";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts } from "../../features/posts/postSlice";

export default function PostOptions({ openSidebar, post }) {
  const allPosts = useSelector(getAllPosts);
  const dispatch = useDispatch();
  console.log(post);

  const handlePostDelete = (id) => {
    dispatch(deletePost(id));
  };
  return (
    <div style={{ position: "relative" }}>
      <div
        className={!openSidebar ? "postOptionsWrap" : "postOptionsWrapCloseBar"}
      >
        <p>Edit</p>
        <hr />
        <p onClick={() => handlePostDelete(post._id)}>Delete</p>
      </div>
    </div>
  );
}
