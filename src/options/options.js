import axios from "axios";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "../apiEndPoint/api";
import { useSelector } from "react-redux";
import { getStudentInfo } from "../features/student/studentsSlice";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";

export const programOptions = [
  { value: "Select", label: "Select" },
  { value: "64bc5b7d24b0183b8ede8957", label: "Agriculture Science" },
  { value: "64bc5ba624b0183b8ede895d", label: "Science" },
  { value: "64bc5bbe24b0183b8ede8963", label: "Home Economics" },
  { value: "64bc5bd124b0183b8ede8969", label: "Business" },
  { value: "64bc5be224b0183b8ede896f", label: "General Art" },
  { value: "64ca233a2a97480b7c2db2cb", label: "Visaul Arts" },
];
export const academicYearOptions = [
  { value: "Select Year", label: "Select Year" },
  { value: "64bc5acd24b0183b8ede8933", label: "2023-2026" },
  { value: "64bc5b0324b0183b8ede8939", label: "2024-2027" },
  { value: "64bc5b2824b0183b8ede893f", label: "2025-2028" },
  { value: "64c9341d6109338e6ca76bc2", label: "2026-2029" },
];
export const academicTermOptions = [
  { value: "Select Year", label: "Select" },
  { value: "64af0734f3dece9edfe0e208", label: "First Term" },
  { value: "64b2e4ce756a5a8432cf5df1", label: "Second Term" },
  { value: "64b2e4e1756a5a8432cf5df7", label: "Third Term" },
];

export const classLevelOptions = [
  { value: "Select Level", label: "Select Level" },
  { value: "64cf197d9f81521cfba82c91", label: "Level 100" },
  { value: "64cf19939f81521cfba82c97", label: "Level 200" },
  { value: "64cf19ab9f81521cfba82c9d", label: "Level 300" },
];
export const religionOptions = [
  { value: "None", label: "None" },
  { value: "Christian", label: "Christian" },
  { value: "Islamic", label: "Islamic" },
  { value: "Traditional", label: "Traditional" },
  { value: "Others", label: "Others" },
];
export const otherTongueOptions = [
  { value: "English", label: "English" },
  { value: "Hausa", label: "Hausa" },
  { value: "French", label: "French" },
  { value: "Spanish", label: "Spanish" },
  { value: "Deutsch", label: "Deutsch" },
];
export const studentRoleOptions = [
  { value: "No Special Role", label: "No Special Role" },
  { value: "Boys Prefect", label: "Boys Prefect" },
  { value: "Girls Prefect", label: "Girls Prefect" },
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

export const genderOptions = [
  { value: "Select", label: "Select" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

export const studentColumn = [
  {
    name: (
      <>
        <p>All</p>{" "}
        <input
          type="checkbox"
          style={{ marginLeft: "1rem" }}
          onSelect={(e) => e.target.value}
        />
      </>
    ),
    selector: (row) => (
      <div>
        <input type="checkbox" />
      </div>
    ),
  },
  {
    name: "Image",
    selector: (row) =>
      row.profilePicture ? (
        <Link
          to={`/sensec/admin/student_info/${row.firstName}_${row.lastName}/${row.studentId}`}
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
    name: "Program",
    selector: (row) => (row.program ? row.program.name : "Unknown"),
  },
  { name: "Student-ID", selector: (row) => row.studentId, sortable: true },
  { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
  { name: "Enrolled Date", selector: (row) => row.dateEnrolled },
  {
    name: "Batch",
    selector: (row) =>
      row.academicYear
        ? `${row.academicYear.fromYear}-${row.academicYear.toYear}`
        : "Unknown",
  },
  {
    name: "Level",
    selector: (row) =>
      row.currentClassLevel && (
        <>
          {row.currentClassLevel.name === "Level 100" && (
            <div className="firstYearTag" title="1st Year"></div>
          )}
          {row.currentClassLevel.name === "Level 200" && (
            <div className="secondYearTag" title="2nd Year"></div>
          )}
          {row.currentClassLevel.name === "Level 300" && !row.isGraduated && (
            <div className="thirdYearTag" title="3rd Year"></div>
          )}
          {row.isGraduated && (
            <div className="isGraduated" title="Graduated">
              <SchoolOutlinedIcon />
            </div>
          )}
        </>
      ),
  },
  {
    name: "Promote",
    selector: (row) =>
      row.currentClassLevel && (
        <>
          {row.currentClassLevel.name === "Level 100" && (
            <Link
              className="editLink"
              onClick={async () => {
                try {
                  await axios.put(
                    `${API_ENDPOINT}/students/promote_student_200/${row._id}`
                  );
                  toast.success("Student promoted successfully...", {
                    position: "top-right",
                    theme: "dark",
                    // toastId: successId,
                  });
                  setTimeout(() => {
                    window.location.reload();
                  }, 5000);
                } catch (error) {
                  console.error(error);
                }
              }}
              // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
            >
              P-L200
            </Link>
          )}
          {row.currentClassLevel.name === "Level 200" && (
            <Link
              className="editLink"
              onClick={async () => {
                try {
                  const res = await axios.put(
                    `${API_ENDPOINT}/students/promote_student_300/${row._id}`
                  );
                  if (res) {
                    toast.success("Student promoted successfully...", {
                      position: "top-right",
                      theme: "dark",
                      // toastId: successId,
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 5000);
                  }
                } catch (error) {
                  console.error(error);
                }
              }}
              // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
            >
              P-L300
            </Link>
          )}
          {row.currentClassLevel.name === "Level 300" && !row.isGraduated && (
            <Link
              className="editLink"
              onClick={async () => {
                try {
                  const res = await axios.put(
                    `${API_ENDPOINT}/students/isgraduated/${row._id}`
                  );
                  if (res) {
                    toast.success("Student graduated successfully...", {
                      position: "top-right",
                      theme: "dark",
                      // toastId: successId,
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 5000);
                  }
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Graduate
            </Link>
          )}
          {row.isGraduated && (
            <Link
              className="editLink"
              // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
            >
              Graduated
            </Link>
          )}
        </>
      ),
  },
  {
    name: "Edit",
    selector: (row) => (
      <Link
        className="editLink"
        to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
      >
        <EditIcon />
      </Link>
    ),
  },
];
export const classLevelStudentsColumn = [
  {
    name: (
      <>
        <p>All</p>{" "}
        <input
          type="checkbox"
          style={{ marginLeft: "1rem" }}
          onSelect={(e) => e.target.value}
        />
      </>
    ),
    selector: (row) => (
      <div>
        <input type="checkbox" />
      </div>
    ),
  },
  {
    name: "Image",
    selector: (row) =>
      row.profilePicture ? (
        <Link
          to={`/sensec/admin/student_info/${row.firstName}_${row.lastName}/${row.studentId}`}
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
    name: "Program",
    selector: (row) => (row.program ? row.program.name : "Unknown"),
  },
  { name: "Student-ID", selector: (row) => row.studentId, sortable: true },
  { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
  { name: "Enrolled Date", selector: (row) => row.dateEnrolled },
  {
    name: "Batch",
    selector: (row) =>
      row.academicYear
        ? `${row.academicYear.fromYear}-${row.academicYear.toYear}`
        : "Unknown",
  },
  {
    name: "Level",
    selector: (row) =>
      row.currentClassLevel && (
        <>
          {row.currentClassLevel.name === "Level 100" && (
            <div className="firstYearTag" title="1st Year"></div>
          )}
          {row.currentClassLevel.name === "Level 200" && (
            <div className="secondYearTag" title="2nd Year"></div>
          )}
          {row.currentClassLevel.name === "Level 300" && !row.isGraduated && (
            <div className="thirdYearTag" title="3rd Year"></div>
          )}
          {row.isGraduated && (
            <div className="isGraduated" title="Graduated">
              <SchoolOutlinedIcon />
            </div>
          )}
        </>
      ),
  },
  {
    name: "Promote",
    selector: (row) =>
      row.currentClassLevel && (
        <>
          {row.currentClassLevel.name === "Level 100" && (
            <Link
              className="editLink"
              onClick={async () => {
                try {
                  await axios.put(
                    `${API_ENDPOINT}/students/promote_student_200/${row._id}`
                  );
                  toast.success("Student promoted successfully...", {
                    position: "top-right",
                    theme: "dark",
                    // toastId: successId,
                  });
                  setTimeout(() => {
                    window.location.reload();
                  }, 5000);
                } catch (error) {
                  console.error(error);
                }
              }}
              // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
            >
              P-L200
            </Link>
          )}
          {row.currentClassLevel.name === "Level 200" && (
            <Link
              className="editLink"
              onClick={async () => {
                try {
                  const res = await axios.put(
                    `${API_ENDPOINT}/students/promote_student_300/${row._id}`
                  );
                  if (res) {
                    toast.success("Student promoted successfully...", {
                      position: "top-right",
                      theme: "dark",
                      // toastId: successId,
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 5000);
                  }
                } catch (error) {
                  console.error(error);
                }
              }}
              // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
            >
              P-L300
            </Link>
          )}
          {row.currentClassLevel.name === "Level 300" && !row.isGraduated && (
            <Link
              className="editLink"
              onClick={async () => {
                try {
                  const res = await axios.put(
                    `${API_ENDPOINT}/students/isgraduated/${row._id}`
                  );
                  if (res) {
                    toast.success("Student graduated successfully...", {
                      position: "top-right",
                      theme: "dark",
                      // toastId: successId,
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 5000);
                  }
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Graduate
            </Link>
          )}
          {row.isGraduated && (
            <Link
              className="editLink"
              // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
            >
              Graduated
            </Link>
          )}
        </>
      ),
  },
  {
    name: "Edit",
    selector: (row) => (
      <Link
        className="editLink"
        to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
      >
        <EditIcon />
      </Link>
    ),
  },
];

export const graduatesColumn = [
  {
    name: "Image",
    selector: (row) =>
      row.profilePicture ? (
        <Link
          to={`/sensec/admin/student_info/${row.firstName}_${row.lastName}/${row.studentId}`}
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
    name: "Program",
    selector: (row) => (row.program ? row.program.name : "Unknown"),
  },
  { name: "Student-ID", selector: (row) => row.studentId, sortable: true },
  { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
  { name: "Enrolled Date", selector: (row) => row.dateEnrolled },
  {
    name: "Batch",
    selector: (row) =>
      row.academicYear
        ? `${row.academicYear.fromYear}-${row.academicYear.toYear}`
        : "Unknown",
  },
  {
    name: "Graduate",
    selector: (row) =>
      row.currentClassLevel && (
        <>
          {row.isGraduated && (
            <div className="isGraduated" title="Graduated">
              <SchoolOutlinedIcon />
            </div>
          )}
        </>
      ),
  },
  // {
  //   name: "Promote",
  //   selector: (row) =>
  //     row.currentClassLevel && (
  //       <>
  //         {row.currentClassLevel.name === "Level 100" && (
  //           <Link
  //             className="editLink"
  //             onClick={async () => {
  //               try {
  //                 await axios.put(
  //                   `${API_ENDPOINT}/students/promote_student_200/${row._id}`
  //                 );
  //                 window.location.reload();
  //               } catch (error) {
  //                 console.error(error);
  //               }
  //             }}
  //             // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
  //           >
  //             P-L200
  //           </Link>
  //         )}
  //         {row.currentClassLevel.name === "Level 200" && (
  //           <Link
  //             className="editLink"
  //             onClick={async () => {
  //               try {
  //                 await axios.put(
  //                   `${API_ENDPOINT}/students/promote_student_300/${row._id}`
  //                 );
  //                 window.location.reload();
  //               } catch (error) {
  //                 console.error(error);
  //               }
  //             }}
  //             // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
  //           >
  //             P-L300
  //           </Link>
  //         )}
  //         {row.currentClassLevel.name === "Level 300" && !row.isGraduated && (
  //           <Link
  //             className="graduatedLink"
  //             onClick={async () => {
  //               try {
  //                 await axios.put(
  //                   `${API_ENDPOINT}/students/isgraduated/${row._id}`
  //                 );
  //                 window.location.reload();
  //               } catch (error) {
  //                 console.error(error);
  //               }
  //             }}
  //           >
  //             Graduate
  //           </Link>
  //         )}
  //         {row.isGraduated && (
  //           <Link
  //             className="isGraduatedLink"
  //             // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
  //           >
  //             Graduated
  //           </Link>
  //         )}
  //       </>
  //     ),
  // },
  // {
  //   name: "Edit",
  //   selector: (row) => (
  //     <Link
  //       className="editLink"
  //       to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
  //     >
  //       <EditIcon />
  //     </Link>
  //   ),
  // },
];

export const studentProgramColumn = [
  {
    name: "Image",
    selector: (row) =>
      row.profilePicture ? (
        <Link
          to={`/sensec/admin/student_info/${row.firstName}_${row.lastName}/${row.studentId}`}
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
    name: "Program",
    selector: (row) =>
      row.courseStudy
        ? row.courseStudy
        : row.program
        ? row.program.name
        : "Unknown",
  },
  { name: "Student-ID", selector: (row) => row.studentId, sortable: true },
  { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
  { name: "Enrolled Date", selector: (row) => row.dateEnrolled },
  {
    name: "Batch",
    selector: (row) =>
      row.academicYear
        ? `${row.academicYear.fromYear}-${row.academicYear.toYear}`
        : "Unknown",
  },
  {
    name: "Level",
    selector: (row) =>
      row.currentClassLevel ? (
        <>
          {row.currentClassLevel.name === "Level 100" && (
            <div className="firstYearTag" title="1st Year"></div>
          )}
          {row.currentClassLevel.name === "Level 200" && (
            <div className="secondYearTag" title="2nd Year"></div>
          )}
          {row.currentClassLevel.name === "Level 300" && (
            <div className="thirdYearTag" title="3rd Year"></div>
          )}
        </>
      ) : (
        "Unknown"
      ),
  },
  {
    name: "Edit",
    selector: (row) => (
      <Link
        className="editLink"
        to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
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

export const staffColumn = [
  {
    name: "Image",
    selector: (row) =>
      row.profilePicture ? (
        <Link
          to={`/sensec/admin/staff_info/${row.staffId}`}
          title="View Staff Info"
        >
          <img className="staffImg" src={row.profilePicture} alt="" />
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
    name: "Staff Role",
    selector: (row) => (row.role ? row.role : "Unknown"),
  },
  { name: "Staff-ID", selector: (row) => row.staffId, sortable: true },
  { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
  { name: "Date Employed", selector: (row) => row.dateEmployed },
  {
    name: "Edit",
    selector: (row) => (
      <Link className="editLink" to={`/sensec/admin/edit_staff/${row.staffId}`}>
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

export const teachersColumn = [
  {
    name: "Image",
    selector: (row) =>
      row.profilePicture ? (
        <Link
          to={`/sensec/admin/teacher_info/${row.teacherId}`}
          title="View Teacher Info"
        >
          <img className="staffImg" src={row.profilePicture} alt="" />
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
    name: "Teacher Role",
    selector: (row) => (row.role ? row.role : "Unknown"),
  },
  {
    name: "Program",
    selector: (row) => (row.program ? row.program.name : "Unknown"),
  },
  {
    name: "Subject(s) Teaching",
    selector: (row) =>
      row.teachingSubjects ? row.teachingSubjects.length : "Unknown",
  },
  { name: "Teacher-ID", selector: (row) => row.teacherId, sortable: true },
  { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
  { name: "Date Employed", selector: (row) => row.dateEmployed },
  {
    name: "Edit",
    selector: (row) => (
      <Link
        className="editLink"
        to={`/sensec/admin/edit_teacher/${row.staffId}`}
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
export const teachersSubjectColumn = [
  {
    name: "Image",
    selector: (row) =>
      row.profilePicture ? (
        <Link
          to={`/sensec/admin/teacher_info/${row.teacherId}`}
          title="View Teacher Info"
        >
          <img className="staffImg" src={row.profilePicture} alt="" />
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
    name: "Teacher Role",
    selector: (row) => (row.role ? row.role : "Unknown"),
  },
  {
    name: "Program",
    selector: (row) => (row.program ? row.program.name : "Unknown"),
  },
  {
    name: "Subject Teaching",
    selector: (row) =>
      row.teachingSubject ? row.teachingSubject.name : "Unknown",
  },
  { name: "Teacher-ID", selector: (row) => row.teacherId, sortable: true },
  { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
  { name: "Date Employed", selector: (row) => row.dateEmployed },
  {
    name: "Edit",
    selector: (row) => (
      <Link
        className="editLink"
        to={`/sensec/admin/edit_teacher/${row.staffId}`}
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

export const adminsColumn = [
  {
    name: "Image",
    selector: (row) =>
      row.profilePicture ? (
        <Link
          to={`/sensec/admin/teacher_info/${row.teacherId}`}
          title="View Teacher Info"
        >
          <img className="staffImg" src={row.profilePicture} alt="" />
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
    name: "Admin Role",
    selector: (row) => (row.role ? row.role : "Unknown"),
  },
  { name: "Admin-ID", selector: (row) => row.adminId, sortable: true },
  { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
  { name: "Date Employed", selector: (row) => row.dateEmployed },
  {
    name: "Edit",
    selector: (row) => (
      <Link
        className="editLink"
        to={`/sensec/admin/edit_teacher/${row.staffId}`}
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
