import React from "react";
import "./modal.scss";
import Parser from "html-react-parser";

export default function Modal({
  open,
  onClose,
  anthemText,
  visionText,
  historyText,
  anthem,
  vision,
  history,
}) {
  if (!open) return null;
  return (
    <div className="modalOverlay">
      Modal
      <div className="modalCont" onClick={onClose}>
        <div
          className="previewHistoryWrap"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <p onClick={onClose}>Close</p>
          {anthem && Parser(anthemText)}
          {vision && Parser(visionText)}
          {history && Parser(historyText)}
        </div>
      </div>
    </div>
  );
}
