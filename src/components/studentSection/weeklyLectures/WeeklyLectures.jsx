import React, { useEffect, useRef, useState } from "react";
import "./weeklyLectures.scss";
import {
  fetchAllTimeTables,
  fetchSingleTimeTable,
  fetchTime,
  getAllTimeTables,
  getSingleTimeTable,
  getTime,
} from "../../../features/timeTable/timeTableSlice";
import { useDispatch, useSelector } from "react-redux";
import { getStudentInfo } from "../../../features/student/studentsSlice";
import { useParams } from "react-router";
import { useDownloadExcel } from "react-export-table-to-excel";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getUser } from "../../../features/allUsers/AllUsersSlice";

export default function WeeklyLectures() {
  const userInfo = useSelector(getUser);
  const allTimeTables = useSelector(getAllTimeTables);
  const singleTimeTable = useSelector(getSingleTimeTable);
  const time = useSelector(getTime);
  // const studentInfo = useSelector(getStudentInfo);
  const dispatch = useDispatch();
  const { program, currentClassLevel } = useParams();

  const [loader, setLoader] = useState(false);
  const showLocaleTime = new Date().toLocaleTimeString("en-US", {
    // timeZone: "Europe/Berlin",
    hour12: false,
  });
  const cTime = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(cTime);
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState("");
  const updateTime = () => {
    const cTime = new Date().toLocaleTimeString("en-US", {
      // timeZone: "Europe/Berlin",
      hour12: true,
    });
    setCurrentTime(cTime);
  };
  setInterval(updateTime, 1000);

  // console.log(currentTime);
  // console.log(cTime);

  const studentInfoRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: studentInfoRef.current,
    filename: "Students_Time_Table",
    sheet: "Students Time Table ",
  });

  const pdfRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;
    setLoader(true);
    html2canvas(input, {
      //useCors helps to render jsx images in pdf format
      // useCORS: true,
    }).then((canvas) => {
      const imgData = new Image();
      imgData.src = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = Math.min(pdfWidth - imgWidth * ratio) / 2;
      const imgY = 20;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.setFontSize({ size: "20px" });
      setLoader(false);
      pdf.save("Students_Time_Table.pdf");
    });
  };

  useEffect(() => {
    dispatch(fetchAllTimeTables());
    dispatch(fetchTime());
    dispatch(
      fetchSingleTimeTable({
        program,
        currentClassLevel,
      })
    );
  }, [dispatch, program, currentClassLevel]);

  useEffect(() => {
    const date = new Date();
    const options = { weekday: "long" };
    const currentDayOfWeek = date.toLocaleString("en-US", options);
    setCurrentDayOfWeek(currentDayOfWeek);
  }, []);

  const lesson1 = showLocaleTime >= "07:30:01" && showLocaleTime <= "08:30:00";
  const break1 = showLocaleTime >= "08:30:01" && showLocaleTime <= "09:00:00";
  const lesson2 = showLocaleTime >= "09:00:01" && showLocaleTime <= "10:00:00";
  const lesson3 = showLocaleTime >= "10:00:01" && showLocaleTime <= "11:00:00";
  const lesson4 = showLocaleTime >= "11:00:01" && showLocaleTime <= "12:00:00";
  const lesson5 = showLocaleTime >= "12:00:01" && showLocaleTime <= "13:00:00";
  const break2 = showLocaleTime >= "13:00:01" && showLocaleTime <= "13:30:00";
  const lesson6 = showLocaleTime >= "13:30:01" && showLocaleTime <= "14:30:00";
  const lesson7 = showLocaleTime >= "14:30:01" && showLocaleTime <= "15:30:00";

  return (
    <div className="studentTimeTable">
      <div className="downloadWrap">
        {userInfo && userInfo.isStudent && (
          <div className="excelExport">
            <button className="excelBtn" onClick={onDownload}>
              Export to Excel
            </button>
            <button
              className="pdfBtn "
              onClick={downloadPDF}
              disabled={!loader}
            >
              {loader ? (
                <span>Download in progress</span>
              ) : (
                <span>Download PDF</span>
              )}
            </button>
          </div>
        )}
      </div>
      <div className="studentTimeTableWrap" ref={pdfRef}>
        <div className="studentTimeTable" ref={studentInfoRef}>
          <h1>Weekly Lectures</h1>
          <p className="theTime">
            <span>{showLocaleTime}</span>
            <span className="localTime">{currentTime}</span>
          </p>
          <table className="studentTimeTableData">
            {time && (
              <>
                {time?.map((time) => (
                  <thead key={time._id}>
                    <tr>
                      <th className="tableHearder">{time.dayTime}</th>
                      <th className={lesson1 ? "currentDay" : "tableHearders"}>
                        {time.lesson1Time}
                      </th>
                      <th className={break1 ? "currentDay" : "tableHearder"}>
                        {time.firstBreak}
                      </th>
                      <th className={lesson2 ? "currentDay" : "tableHearder"}>
                        {time.lesson2Time}
                      </th>
                      <th className={lesson3 ? "currentDay" : "tableHearder"}>
                        {time.lesson3Time}
                      </th>
                      <th className={lesson4 ? "currentDay" : "tableHearder"}>
                        {time.lesson4Time}
                      </th>
                      <th className={lesson5 ? "currentDay" : "tableHearder"}>
                        {time.lesson5Time}
                      </th>
                      <th className={break2 ? "currentDay" : "tableHearder"}>
                        {time.secondBreak}
                      </th>
                      <th className={lesson6 ? "currentDay" : "tableHearder"}>
                        {time.lesson6Time}
                      </th>
                      <th className={lesson7 ? "currentDay" : "tableHearder"}>
                        {time.lesson7Time}
                      </th>
                    </tr>
                  </thead>
                ))}
              </>
            )}
            {allTimeTables && (
              <>
                {singleTimeTable.allDays?.map((day) => (
                  <tbody key={day._id}>
                    <tr>
                      <th
                        className={
                          currentDayOfWeek === day.nameOfDay
                            ? "currentDay"
                            : "days"
                        }
                      >
                        {day.nameOfDay}
                      </th>
                      <td
                        className={
                          currentDayOfWeek === day.nameOfDay && lesson1
                            ? "currentLesson"
                            : "lessons"
                        }
                      >
                        <div className="displayColumn">
                          <span>{day.lesson1}</span>
                        </div>
                      </td>
                      <td className={break1 ? "currentBreakTime" : "breakTime"}>
                        {day.breakLetter}
                      </td>
                      <td
                        className={
                          currentDayOfWeek === day.nameOfDay && lesson2
                            ? "currentLesson"
                            : "lessons"
                        }
                      >
                        {day.lesson2}
                      </td>
                      <td
                        className={
                          currentDayOfWeek === day.nameOfDay && lesson3
                            ? "currentLesson"
                            : "lessons"
                        }
                      >
                        {day.lesson3}
                      </td>
                      <td
                        className={
                          currentDayOfWeek === day.nameOfDay && lesson4
                            ? "currentLesson"
                            : "lessons"
                        }
                      >
                        {day.lesson4}
                      </td>
                      <td
                        className={
                          currentDayOfWeek === day.nameOfDay && lesson5
                            ? "currentLesson"
                            : "lessons"
                        }
                      >
                        {day.lesson5}
                      </td>
                      <td className={break2 ? "currentBreakTime" : "breakTime"}>
                        {day.breakLetter}
                      </td>
                      <td
                        className={
                          currentDayOfWeek === day.nameOfDay && lesson6
                            ? "currentLesson"
                            : "lessons"
                        }
                      >
                        {day.lesson6}
                      </td>
                      <td
                        className={
                          currentDayOfWeek === day.nameOfDay && lesson7
                            ? "currentLesson"
                            : "lessons"
                        }
                      >
                        {day.lesson7}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </>
            )}
          </table>
          <div className="classTeacher">
            <span>Class Teacher:</span>
            {userInfo && (
              <p>
                {userInfo.classTeacher?.gender === "Male" && "Mr."}
                {userInfo.classTeacher?.gender === "Female" && "Mrs."}{" "}
                {userInfo.classTeacher?.fullName}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
