import axios from "axios";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "../apiEndPoint/api";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";

export const programOptions = [
  { value: "Select", label: "Select" },
  { value: "64d9590d41b1b91c4bbcc6e7", label: "Business" },
  { value: "64d9cef9e6cafed115a764ab", label: "Visaul Arts" },
  { value: "64dbe6c4bdfd95a964f471ea", label: "Agric Science" },
  { value: "64d751852d98841f7c9ee4d5", label: "General Arts_1" },
  { value: "64d752682d98841f7c9ee4dd", label: "General Arts_2" },
  { value: "64d752932d98841f7c9ee4e5", label: "General Arts_3" },
  { value: "64d753172d98841f7c9ee4ed", label: "General Arts_4" },
  { value: "64d751092d98841f7c9ee4cd", label: "General Science" },
  { value: "64d753832d98841f7c9ee4f5", label: "Home Economics_1" },
  { value: "64d753be2d98841f7c9ee4fd", label: "Home Economics_2" },
];
export const sectionsNameOptions = [
  { value: "Select", label: "Select" },
  { value: "Business", label: "Business" },
  { value: "Visaul_Arts", label: "Visaul Arts" },
  { value: "Agric_Science", label: "Agric Science" },
  { value: "General_Arts_1", label: "General Arts 1" },
  { value: "General_Arts_2", label: "General Arts 2" },
  { value: "General_Arts_3", label: "General Arts 3" },
  { value: "General_Arts_4", label: "General Arts 4" },
  { value: "General_Science", label: "General Science" },
  { value: "Home_Economics_1", label: "Home Economics 1" },
  { value: "Home_Economics_2", label: "Home Economics 2" },
];
export const classSectionLabelOptions = [
  { value: "Select", label: "Select" },
  { value: "Level_100", label: "Level 100" },
  { value: "Level_200", label: "Level 200" },
  { value: "Level_300", label: "Level 300" },
];
export const academicYearOptions = [
  { value: "Select", label: "Select" },
  { value: "64cff5e79e1d6d39b72d6c3d", label: "2023-2026" },
  // { value: "64bc5b0324b0183b8ede8939", label: "2024-2027" },
  // { value: "64bc5b2824b0183b8ede893f", label: "2025-2028" },
  // { value: "64c9341d6109338e6ca76bc2", label: "2026-2029" },
];
export const academicTermOptions = [
  { value: "Select", label: "Select" },
  { value: "64cfd54bc0970fa09be4e14f", label: "First Semester" },
  // { value: "64b2e4ce756a5a8432cf5df1", label: "Second Semester" },
  // { value: "64b2e4e1756a5a8432cf5df7", label: "Third Semester" },
];

export const classLevelOptions = [
  { value: "Select", label: "Select" },
  { value: "64d808e7f457ed82531d78b0", label: "Level 100" },
  { value: "64d8090bf457ed82531d78b6", label: "Level 200" },
  { value: "64d80926f457ed82531d78bc", label: "Level 300" },
];
export const classLevelNameOptions = [
  { value: "Select", label: "Select" },
  { value: "Level_100", label: "Level_100" },
  { value: "Level_200", label: "Level_200" },
  { value: "Level_300", label: "Level_300" },
];
export const teachersOptions = [
  { value: "Select", label: "Select" },
  { value: "64e2922e28d5de2b84cec123", label: "Mr. Nicholas Afful" },
  { value: "64e2925e28d5de2b84cec12c", label: "Mr. Joana Mensah" },
  { value: "64e2929128d5de2b84cec189", label: "Mr. Stephen Bentum" },
  { value: "64d80a4cf457ed82531d78d3", label: "Mr. Matthias Menk" },
  { value: "64de03ffe55a91b5a3c64baf", label: "Mrs. Joana Essuman" },
  { value: "64d9cfbee6cafed115a764b9", label: "Mrs. Matilda Asare" },
  { value: "64d9cfe6e6cafed115a764c4", label: "Mrs. Elena Bentum" },
  { value: "64d9d010e6cafed115a764d1", label: "Mr. Patrick Kenneford Annan" },
  { value: "64dbe883bdfd95a964f4720c", label: "Mr. Maxwell Mensah" },
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
        <div className="tableClassLevel">
          {row.currentClassLevel.name === "Level_100" && (
            <div className="firstYearTag" title="1st Year">
              1
            </div>
          )}
          {row.currentClassLevel.name === "Level_200" && (
            <div className="secondYearTag" title="2nd Year">
              2
            </div>
          )}
          {row.currentClassLevel.name === "Level_300" && !row.isGraduated && (
            <div className="thirdYearTag" title="3rd Year">
              3
            </div>
          )}
          {row.isGraduated && (
            <div className="isGraduated" title="Graduated">
              <SchoolOutlinedIcon />
            </div>
          )}
        </div>
      ),
  },
  {
    name: "Promote",
    selector: (row) =>
      row.currentClassLevel && (
        <>
          {row.currentClassLevel.name === "Level_100" && (
            <Link
              className="editLink"
              onClick={async () => {
                try {
                  const res = await axios.put(
                    `${API_ENDPOINT}/students/promote_student_200/${row._id}`
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
                  toast.error(
                    "Student promotion failed! Class level or section not found!",
                    {
                      position: "top-right",
                      theme: "light",
                      // toastId: successId,
                    }
                  );
                }
              }}
              // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
            >
              P-L200
            </Link>
          )}
          {row.currentClassLevel.name === "Level_200" && (
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
                  toast.error(
                    "Student promotion failed! Class level or section not found!",
                    {
                      position: "top-right",
                      theme: "light",
                      // toastId: successId,
                    }
                  );
                }
              }}
              // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
            >
              P-L300
            </Link>
          )}
          {row.currentClassLevel.name === "Level_300" && !row.isGraduated && (
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
                  toast.error("Student graduation failed! Try again later.", {
                    position: "top-right",
                    theme: "light",
                    // toastId: successId,
                  });
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
export const pendingStudentsColumn = [
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
        <div className="tableClassLevel">
          {row.currentClassLevel.name === "Level_100" && (
            <div className="firstYearTag" title="1st Year">
              1
            </div>
          )}
          {row.currentClassLevel.name === "Level_200" && (
            <div className="secondYearTag" title="2nd Year">
              2
            </div>
          )}
          {row.currentClassLevel.name === "Level_300" && !row.isGraduated && (
            <div className="thirdYearTag" title="3rd Year">
              3
            </div>
          )}
          {row.isGraduated && (
            <div className="isGraduated" title="Graduated">
              <SchoolOutlinedIcon />
            </div>
          )}
        </div>
      ),
  },
  {
    // name: "Promote",
    selector: (row) =>
      row.pending && (
        <Link
          className="approveLink"
          onClick={async () => {
            try {
              const res = await axios.put(
                `${API_ENDPOINT}/students/approve_pending_student/${row._id}`
              );
              if (res) {
                toast.success(
                  "Student's application approved successfully...",
                  {
                    position: "top-right",
                    theme: "dark",
                    // toastId: successId,
                  }
                );
                setTimeout(() => {
                  window.location.reload();
                }, 5000);
              }
            } catch (error) {
              toast.error("Student approval failed! Try again later", {
                position: "top-right",
                theme: "light",
                // toastId: successId,
              });
            }
          }}
          // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
        >
          Approve
        </Link>
      ),
  },
  {
    // name: "Edit",
    selector: (row) => (
      <Link
        className="rejectLink"
        onClick={async () => {
          try {
            const res = await axios.delete(
              `${API_ENDPOINT}/students/delete_student/${row._id}`
            );
            if (res) {
              toast.success("Student disapproved successfully...", {
                position: "top-right",
                theme: "dark",
                // toastId: successId,
              });
              setTimeout(() => {
                window.location.reload();
              }, 5000);
            }
          } catch (error) {
            toast.error("Student disapproved failed! Try again later", {
              position: "top-right",
              theme: "light",
              // toastId: successId,
            });
          }
        }}
      >
        Reject
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
        <div className="tableClassLevel">
          {row.currentClassLevel.name === "Level_100" && (
            <div className="firstYearTag" title="1st Year">
              1
            </div>
          )}
          {row.currentClassLevel.name === "Level_200" && (
            <div className="secondYearTag" title="2nd Year">
              2
            </div>
          )}
          {row.currentClassLevel.name === "Level_300" && !row.isGraduated && (
            <div className="thirdYearTag" title="3rd Year">
              3
            </div>
          )}
          {row.isGraduated && (
            <div className="isGraduated" title="Graduated">
              <SchoolOutlinedIcon />
            </div>
          )}
        </div>
      ),
  },
  {
    name: "Promote",
    selector: (row) =>
      row.currentClassLevel && (
        <>
          {row.currentClassLevel.name === "Level_100" && (
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
                  toast.error(
                    "Student promotion failed! Class level or section not found!",
                    {
                      position: "top-right",
                      theme: "light",
                      // toastId: successId,
                    }
                  );
                }
              }}
              // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
            >
              P-L200
            </Link>
          )}
          {row.currentClassLevel.name === "Level_200" && (
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
                  toast.error(
                    "Student promotion failed! Class level or section not found!",
                    {
                      position: "top-right",
                      theme: "light",
                      // toastId: successId,
                    }
                  );
                }
              }}
              // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
            >
              P-L300
            </Link>
          )}
          {row.currentClassLevel.name === "Level_300" && !row.isGraduated && (
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
                  toast.error("Student graduation failed! Try again later.", {
                    position: "top-right",
                    theme: "light",
                    // toastId: successId,
                  });
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
      row.isGraduated && (
        <div className="isGraduated" title="Graduated">
          <SchoolOutlinedIcon />
        </div>
      ),
  },
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
      row.currentClassLevel ? (
        <div className="tableClassLevel">
          {row.currentClassLevel.name === "Level_100" && (
            <div className="firstYearTag" title="1st Year">
              1
            </div>
          )}
          {row.currentClassLevel.name === "Level_200" && (
            <div className="secondYearTag" title="2nd Year">
              2
            </div>
          )}
          {row.currentClassLevel.name === "Level_300" && (
            <div className="thirdYearTag" title="3rd Year">
              3
            </div>
          )}
        </div>
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
        <EditIcon />
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
        <EditIcon />
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
