import { Link, useParams } from "react-router-dom";

export const religionOptions = [
  { value: "None", label: "None" },
  { value: "Christian", label: "Christian" },
  { value: "Islamic", label: "Islamic" },
  { value: "Traditional", label: "Traditional" },
  { value: "Others", label: "Others" },
];
export const otherTongueOptions = [
  { value: "English", label: "English" },
  // { value: "Hausa", label: "Hausa" },
  // { value: "French", label: "French" },
  // { value: "Spanish", label: "Spanish" },
  // { value: "Deutsch", label: "Deutsch" },
];
export const regionOptions = [
  { value: "None", label: "None" },
  { value: "Greater Accra", label: "Greater Accra" },
  { value: "Ashanti", label: "Ashanti" },
  { value: "Volta", label: "Volta" },
  { value: "Northern", label: "Northern" },
  { value: "Central", label: "Central" },
  { value: "Eastern", label: "Eastern" },
  { value: "Western", label: "Western" },
  { value: "Oti", label: "Oti" },
  { value: "Bono East", label: "Bono East" },
  { value: "Western North", label: "Western North" },
  { value: "Bono", label: "Bono" },
  { value: "Brong Ahafo", label: "Brong Ahafo" },
  { value: "Ahafo", label: "Ahafo" },
  { value: "Upper West", label: "Upper West" },
  { value: "Upper East", label: "Upper East" },
  { value: "North East", label: "North East" },
];
export const complexionOptions = [
  { value: "None", label: "None" },
  { value: "Very Fair/Ivory", label: "Very Fair/Ivory" },
  { value: "Fair", label: "Fair" },
  { value: "Medium/Normal", label: "Medium/Normal" },
  { value: "Olive", label: "Olive" },
  { value: "Brown", label: "Brown" },
  { value: "Black", label: "Black" },
];

export const gender = [
  { male: "male", female: "female", transgender: "transgender" },
];

// const {studentId}=useParams()

const clickHandler = (state) => {
  console.log("ID ", state.id);
};

export const column = [
  {
    name: "Image",
    selector: (row) =>
      row.profilePicture ? (
        <Link
          to={`/sensec/admin/student_info/${row.studentId}`}
          title="View Student Info"
        >
          <img className="studentImg" src={row.profilePicture} alt="" />
        </Link>
      ) : (
        "none"
      ),
  },
  {
    name: "First Name",
    selector: (row) => row.firstName,
    sortable: true,
  },
  { name: "Surname", selector: (row) => row.lastName },
  {
    name: "Date Of Birth",
    selector: (row) => (row.dateOfBirth ? row.dateOfBirth : "Unknown"),
  },
  {
    name: "Course",
    selector: (row) => (row.courseStudy ? row.courseStudy : "Unknown"),
  },
  { name: "Student-ID", selector: (row) => row.studentId, sortable: true },
  { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
  { name: "Enrolled Date", selector: (row) => row.registedDate },
  {
    name: "Level",
    selector: (row) =>
      row.level ? (
        <div
          className={
            row.level === "1"
              ? "firstYearTag"
              : row.level === "2"
              ? "secondYearTag"
              : "thirdYearTag"
          }
          title={
            row.level === "1"
              ? "1st Year"
              : row.level === "2"
              ? "2nd Year"
              : "3rd Year"
          }
        ></div>
      ) : (
        "Unknown"
      ),
  },
  {
    name: "Edit",
    selector: (row) => (
      <Link
        className="editLink"
        to={`/sensec/admin/edit_student/${row.studentId}`}
      >
        Edit
      </Link>
    ),
    // cell: (props) => (
    //   <Link
    //     to={`/sensec/admin/edit_student/${row.id}`}
    //     onClick={() => {
    //       clickHandler(props);
    //     }}
    //   >
    //     Edit
    //   </Link>
    // ),
  },
];

export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: ["Roboto", "Poppins"] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video", "file"],
    ["code-block"],
    ["clean"],
  ],
};
