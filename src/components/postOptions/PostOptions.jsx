import React from "react";
import "./postOptions.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getAllPosts,
  updatePost,
} from "../../features/posts/postSlice";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { all } from "axios";

export default function PostOptions({ openSidebar, post, postOptions }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const allPosts = useSelector(getAllPosts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(post);
  console.log(allPosts);

  const selectedPost = allPosts.find((pst) => pst._id === post._id);
  console.log(selectedPost);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: ".4rem",
  };

  const handlePostDelete = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        className={!openSidebar ? "postOptionsWrap" : "postOptionsWrapCloseBar"}
      >
        <p
          onClick={() =>
            navigate(`/sensec/admin/general_announcement/update/${post._id}`)
          }
        >
          Edit
        </p>
        <hr />
        <p onClick={handleOpen}>Delete</p>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal"
        >
          <Box sx={style}>
            <p className="deleteQuestion">
              Are you sure you want to delete this?
            </p>
            <div className="deleteOptions">
              <span className="yes" onClick={() => handlePostDelete(post._id)}>
                YES
              </span>
              <span className="no" onClick={handleClose}>
                NO
              </span>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
