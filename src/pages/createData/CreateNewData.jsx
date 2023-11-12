import React, { useState } from "react";
import "./createNewData.scss";
import { Outlet, useNavigate } from "react-router-dom";

export default function CreateNewData() {
  const navigate = useNavigate();
  return (
    <div className="createCont">
      <div className="createTitle">
        <h1>Create New Data</h1>
      </div>
      <div className="createWrap">
        <button
          className="createBtn"
          onClick={() => navigate("/sensec/admin/create_data/academic_year")}
        >
          A-Year
        </button>
        <button
          className="createBtn"
          onClick={() => navigate("/sensec/admin/create_data/year_group")}
        >
          Year Group
        </button>
        <button
          className="createBtn"
          onClick={() => navigate("/sensec/admin/create_data/academic_term")}
        >
          A-Term
        </button>
        <button
          className="createBtn"
          onClick={() => navigate("/sensec/admin/create_data/class_level")}
        >
          Class Level
        </button>
        <button
          className="createBtn"
          onClick={() => navigate("/sensec/admin/create_data/program")}
        >
          Program
        </button>
        <button
          className="createBtn"
          onClick={() => navigate("/sensec/admin/create_data/class_section")}
        >
          Class Section
        </button>
        <button
          className="createBtn"
          onClick={() => navigate("/sensec/admin/create_data/elective_subject")}
        >
          E-Subject
        </button>
        <button
          className="createBtn"
          onClick={() => navigate("/sensec/admin/create_data/core_subject")}
        >
          C-Subject
        </button>
        <button
          className="createBtn"
          onClick={() => {
            navigate("/sensec/admin/create_data/school_data");
          }}
        >
          School Data
        </button>
      </div>
      <Outlet />
    </div>
  );
}
