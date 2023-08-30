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

export default function WeeklyLectures() {
  const allTimeTables = useSelector(getAllTimeTables);
  const singleTimeTable = useSelector(getSingleTimeTable);
  const time = useSelector(getTime);
  const studentInfo = useSelector(getStudentInfo);
  const dispatch = useDispatch();
  const { program, currentClassLevel } = useParams();

  const [loader, setLoader] = useState(false);
  const cTime = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(cTime);
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState("");
  const updateTime = () => {
    const cTime = new Date().toLocaleTimeString();
    setCurrentTime(cTime);
  };
  setInterval(updateTime, 1000);
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
  console.log(allTimeTables);
  console.log(singleTimeTable);
  console.log(studentInfo);
  console.log(time);
  console.log(program, currentClassLevel);

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

  const lesson1 = currentTime >= "8:00:00" && !(currentTime > "8:45:00");
  const lesson2 = currentTime >= "8:45:01" && !(currentTime > "9:30:00");
  const lesson3 = currentTime >= "9:30:01" && !(currentTime > "10:15:00");
  const break1 = currentTime >= "10:15:01" && !(currentTime > "10:45:00");
  const lesson4 = currentTime >= "10:15:01" && !(currentTime > "10:45:00");
  const lesson5 = currentTime >= "10:45:01" && !(currentTime > "11:30:00");
  const lesson6 = currentTime >= "11:30:01" && !(currentTime > "12:15:00");
  const break2 = currentTime >= "12:15:01" && !(currentTime > "12:30:00");
  const lesson7 = currentTime >= "12:30:01" && !(currentTime > "13:15:00");
  const lesson8 = currentTime >= "13:15:01" && !(currentTime > "14:00:00");

  return (
    <div className="studentTimeTable">
      <div className="downloadWrap">
        {studentInfo.isStudent && (
          <div className="excelExport">
            <button className="excelBtn" onClick={onDownload}>
              Export to Excel
            </button>
            <button
              className="pdfBtn "
              onClick={downloadPDF}
              disabled={!(loader === false)}
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
        <table className="studentTimeTable" ref={studentInfoRef}>
          <h1>Weekly Lectures</h1>
          <p className="theTime">{currentTime}</p>
          {/* <p className="theDay">{currentDayOfWeek}</p> */}
          <table className="studentTimeTableData">
            {time &&
              time.map((time) => (
                <tr key={time._id}>
                  <th className="tableHearder">{time.dayTime}</th>
                  <th className="tableHearder">{time.lesson1Time}</th>
                  <th className="tableHearder">{time.lesson2Time}</th>
                  <th className="tableHearder">{time.lesson3Time}</th>
                  <th className="tableHearder">{time.firstBreak}</th>
                  <th className="tableHearder">{time.lesson4Time}</th>
                  <th className="tableHearder">{time.lesson5Time}</th>
                  <th className="tableHearder">{time.lesson6Time}</th>
                  <th className="tableHearder">{time.secondBreak}</th>
                  <th className="tableHearder">{time.lesson7Time}</th>
                  <th className="tableHearder">{time.lesson8Time}</th>
                </tr>
              ))}
            {allTimeTables && (
              <>
                {singleTimeTable.allDays?.map((day) => (
                  <tr key={day._id}>
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
                          : "alignTextLeft"
                      }
                    >
                      {day.lesson1}
                    </td>
                    <td
                      className={
                        currentDayOfWeek === day.nameOfDay && lesson2
                          ? "currentLesson"
                          : "alignTextLeft"
                      }
                    >
                      {day.lesson2}
                    </td>
                    <td
                      className={
                        currentDayOfWeek === day.nameOfDay && lesson3
                          ? "currentLesson"
                          : "alignTextLeft"
                      }
                    >
                      {day.lesson3}
                    </td>
                    <td className={break1 ? "currentBreakTime" : "breakTime"}>
                      {day.breakLetter}
                    </td>
                    <td
                      className={
                        currentDayOfWeek === day.nameOfDay && lesson4
                          ? "currentLesson"
                          : "alignTextLeft"
                      }
                    >
                      {day.lesson4}
                    </td>
                    <td
                      className={
                        currentDayOfWeek === day.nameOfDay && lesson5
                          ? "currentLesson"
                          : "alignTextLeft"
                      }
                    >
                      {day.lesson5}
                    </td>
                    <td
                      className={
                        currentDayOfWeek === day.nameOfDay && lesson6
                          ? "currentLesson"
                          : "alignTextLeft"
                      }
                    >
                      {day.lesson6}
                    </td>
                    <td className={break2 ? "currentBreakTime" : "breakTime"}>
                      {day.breakLetter}
                    </td>
                    <td
                      className={
                        currentDayOfWeek === day.nameOfDay && lesson7
                          ? "currentLesson"
                          : "alignTextLeft"
                      }
                    >
                      {day.lesson7}
                    </td>
                    <td
                      className={
                        currentDayOfWeek === day.nameOfDay && lesson8
                          ? "currentLesson"
                          : "alignTextLeft"
                      }
                    >
                      {day.lesson8}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </table>
          <div className="classTeacher">
            <span>Class Teacher:</span>
            <p>
              {studentInfo &&
                studentInfo.classTeacher?.gender === "Male" &&
                "Mr."}
              {studentInfo &&
                studentInfo.classTeacher?.gender === "Female" &&
                "Mrs."}{" "}
              {studentInfo && studentInfo.classTeacher?.fullName}
            </p>
          </div>
        </table>
      </div>
    </div>
  );
}
