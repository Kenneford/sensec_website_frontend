import React, { useRef, useState } from "react";
import "./createSchoolData.scss";
import { Editor } from "@tinymce/tinymce-react";
import Parser from "html-react-parser";
import { useDispatch } from "react-redux";
import { addSchoolData } from "../../../features/school/schoolSlice";
import Modal from "./modal/Modal";

export default function CreateSchoolData({ toast }) {
  const anthemText = localStorage.getItem("anthemText");
  const visionText = localStorage.getItem("visionText");
  const historyText = localStorage.getItem("historyText");
  console.log(anthemText);
  const dispatch = useDispatch();
  const TiniMCE_API_KEY = process.env.REACT_APP_TINYMCE_KEY;
  const [loadLogo, setLoadLogo] = useState("");
  const [anthemBody, setAnthemBody] = useState("");
  const [visionBody, setVisionBody] = useState("");
  const [historyBody, setHistoryBody] = useState("");
  const [anthemPreview, setAnthemPreview] = useState(false);
  const [visionPreview, setVisionPreview] = useState(false);
  const [historyPreview, setHistoryPreview] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  //TINYMCE Editr ref
  const editorRef = useRef(null);
  const [schoolData, setSchoolData] = useState({
    name: "",
    // anthem: "",
    slogan: "",
    greetings: "",
    logo: "",
    // vision: "",
    // history: "",
  });

  const handleInputValue = (e) => {
    setSchoolData({
      ...schoolData,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(schoolData);

  const handleLogoFileUpload = (e) => {
    if (e.target.files.length !== 0) {
      setSchoolData({ ...schoolData, [e.target.name]: e.target.files[0] });
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLoadLogo(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const createSchoolData = (e) => {
    e.preventDefault();
    if (!schoolData.logo) {
      toast.error("Please upload school logo!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    }
    const formData = new FormData();
    formData.append("name", schoolData.name);
    formData.append("greetings", schoolData.greetings);
    formData.append("slogan", schoolData.slogan);
    formData.append("logo", schoolData.logo);
    formData.append("anthem", anthemBody);
    formData.append("vision", visionBody);
    formData.append("history", historyBody);
    dispatch(addSchoolData(formData));
    setSchoolData({});
    setLoadLogo("");
    setAnthemBody(localStorage.setItem("anthemText", ""));
    setVisionBody(localStorage.setItem("viosionText", ""));
    setHistoryBody(localStorage.setItem("historyText", ""));
  };

  return (
    <div className="schoolDataCont">
      <div className="schoolDataWrap">
        <h2>Create School Data</h2>
        <form onSubmit={createSchoolData}>
          <div className="topSchData">
            <div className="topInputs">
              <input
                type="text"
                name="name"
                onChange={handleInputValue}
                placeholder="Enter name of school"
              />
              <input
                type="text"
                name="slogan"
                onChange={handleInputValue}
                placeholder="School slogan"
              />
              <input
                type="text"
                name="greetings"
                onChange={handleInputValue}
                placeholder="School greetings"
              />
            </div>
            <div className="logoFile">
              <label htmlFor="logo" className="logoUpload">
                <img
                  className="logoImg"
                  src={!loadLogo ? "/assets/noAvatar.png" : loadLogo}
                  alt="school logo"
                />
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                onChange={handleLogoFileUpload}
                name="logo"
                id="logo"
                accept=".png,.jpeg,.jpg"
              />
            </div>
          </div>
        </form>
        <div className="anthemEditor">
          <div className="preview">
            <h4>Anthem of the School</h4>
            <button
              onClick={() =>
                setOpenModal(
                  true,
                  setAnthemPreview(true),
                  setVisionPreview(false),
                  setHistoryPreview(false)
                )
              }
            >
              Preview
            </button>
          </div>
          <Editor
            apiKey={TiniMCE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            // initialValue={localStorage.getItem("myContentText")}
            value={localStorage.getItem("anthemText")}
            onEditorChange={(newText) => {
              setAnthemBody(newText);
              localStorage.setItem("anthemText", newText);
            }}
            init={{
              height: 400,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "link",
                "image",
                "lists",
                "charmap",
                "preview",
                "anchor",
                "pagebreak",
                "searchreplace",
                "wordcount",
                "visualblocks",
                "visualchars",
                "code",
                "advcode",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "emoticons",
                "help",
                "linkchecker",
                "paste",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor spellchecker | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                "advcode | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              style_formats: [
                {
                  title: "Sub-Title",
                  block: "h4",
                  attributes: { id: "subTitle" },
                  classes: "subTitle",
                },
              ],
            }}
          />
        </div>
        <div className="visionEditor">
          <div className="preview">
            <h4>Vision of the School</h4>
            <button
              onClick={() =>
                setOpenModal(
                  true,
                  setVisionPreview(
                    true,
                    setAnthemPreview(false),
                    setHistoryPreview(false)
                  )
                )
              }
            >
              Preview
            </button>
          </div>
          <Editor
            apiKey={TiniMCE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            // initialValue={localStorage.getItem("myContentText")}
            value={localStorage.getItem("visionText")}
            onEditorChange={(newText) => {
              setVisionBody(newText);
              localStorage.setItem("visionText", newText);
            }}
            init={{
              height: 400,
              menubar: true,
              font_size_formats: "1.2rem",
              plugins: [
                "advlist",
                "autolink",
                "link",
                "image",
                "lists",
                "charmap",
                "preview",
                "anchor",
                "pagebreak",
                "searchreplace",
                "wordcount",
                "visualblocks",
                "visualchars",
                "code",
                "advcode",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "emoticons",
                "help",
                "linkchecker",
                "paste",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor spellchecker | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                "advcode | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              style_formats: [
                {
                  title: "Sub-Title",
                  block: "h4",
                  attributes: { id: "subTitle" },
                  classes: "subTitle",
                },
              ],
            }}
          />
        </div>
        <div className="historyEditor">
          <div className="preview">
            <h4>History of the School</h4>
            <button
              onClick={() =>
                setOpenModal(
                  true,
                  setHistoryPreview(
                    true,
                    setVisionPreview(false),
                    setAnthemPreview(false)
                  )
                )
              }
            >
              Preview
            </button>
          </div>
          <Editor
            apiKey={TiniMCE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            // initialValue={localStorage.getItem("myContentText")}
            value={localStorage.getItem("historyText")}
            onEditorChange={(newText) => {
              setHistoryBody(newText);
              localStorage.setItem("historyText", newText);
            }}
            init={{
              height: 400,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "link",
                "image",
                "lists",
                "charmap",
                "preview",
                "anchor",
                "pagebreak",
                "searchreplace",
                "wordcount",
                "visualblocks",
                "visualchars",
                "code",
                "advcode",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "emoticons",
                "help",
                "linkchecker",
                "paste",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor spellchecker | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                "advcode | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              style_formats: [
                {
                  title: "Sub-Title",
                  block: "h4",
                  attributes: { id: "subTitle" },
                  classes: "subTitle",
                },
              ],
            }}
          />
        </div>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          anthemText={anthemText}
          visionText={visionText}
          historyText={historyText}
          anthem={anthemPreview}
          vision={visionPreview}
          history={historyPreview}
        />
        <div className="schDataBtn">
          <button onClick={(e) => createSchoolData(e)} type="submit">
            Create Data
          </button>
        </div>
      </div>
    </div>
  );
}
