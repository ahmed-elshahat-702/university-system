"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userDataForm, setUserDataForm] = useState(initialUserData);

  useEffect(() => {
    const adminData = sessionStorage.getItem("adminData");
    if (!adminData) {
      Swal.fire({
        icon: "warning",
        title: "Please login first",
        text: "You need to login to access the admin page",
      }).then(() => {
        router.push("/");
      });
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/api/admin/add-user", userDataForm);
      if (response.data === "User already exists") {
        throw new Error("User already exists");
      }
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "New User Added Successfully.",
      }).then(() => {
        router.push("/admin");
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className={`add-user-page ${isLoading ? "loading" : ""}`}>
      <div className={`${isLoading ? "blur-container" : ""}`}>
        {/* Navigation */}
        <nav className="fixed top-0 w-full flex items-center content-between py-3 px-4 text-black bg-gray-100 shadow z-50">
          {/* Title */}
          <div className="container mx-auto sm:px-4">
            <h1 className="inline-block pt-1 pb-1 mr-4 text-lg whitespace-no-wrap font-bold uppercase">
              Add User
            </h1>
          </div>
          {/* Cancel Button */}
          <button
            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-red-600 border-red-600 hover:text-white bg-white hover:bg-red-700"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </nav>
        {/* Form */}
        <div className="p-6 mt-12">
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            {Object.entries(userDataForm).map(([section, fields]) => (
              <fieldset key={section} className="mb-4 flex flex-wrap">
                <legend className="mb-3 font-medium">
                  {section.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase()}
                </legend>
                {/* Individual fields */}
                {Object.entries(fields).map(([fieldName, fieldValue]) => (
                  <div
                    key={fieldName}
                    className="mb-3 w-full sm:w-1/2 pr-4 pl-4 md:w-1/3 lg:w-1/4 flex flex-col"
                  >
                    <label
                      htmlFor={`${section}.${fieldName}`}
                      className="form-label"
                    >
                      {fieldName
                        .replace(/([a-z])([A-Z])/g, "$1 $2")
                        .toLowerCase()}
                    </label>
                    {/* Datepicker for birthdate field */}
                    {fieldName === "birthdate" && (
                      <DatePicker
                        id={`${section}.${fieldName}`}
                        selected={fieldValue ? new Date(fieldValue) : null}
                        onChange={(date) =>
                          setUserDataForm((prevData) => ({
                            ...prevData,
                            [section]: {
                              ...prevData[section],
                              [fieldName]: date ? date.toISOString() : "",
                            },
                          }))
                        }
                        dateFormat="yyyy-MM-dd"
                        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                        required
                      />
                    )}
                    {/* Disabled input field for role */}
                    {fieldName === "role" && (
                      <input
                        type="text"
                        name={fieldName}
                        id={`${section}.${fieldName}`}
                        value={fieldValue}
                        onChange={(e) =>
                          setUserDataForm((prevData) => ({
                            ...prevData,
                            [section]: {
                              ...prevData[section],
                              [fieldName]: e.target.value,
                            },
                          }))
                        }
                        disabled
                        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-gray-200 text-gray-800 border border-gray-200 rounded"
                      />
                    )}
                    {/* Regular input fields */}
                    {fieldName !== "birthdate" && fieldName !== "role" && (
                      <input
                        type="text"
                        name={fieldName}
                        id={`${section}.${fieldName}`}
                        value={fieldValue}
                        onChange={(e) =>
                          setUserDataForm((prevData) => ({
                            ...prevData,
                            [section]: {
                              ...prevData[section],
                              [fieldName]: e.target.value,
                            },
                          }))
                        }
                        required={isRequired(section, fieldName)}
                        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                      />
                    )}
                  </div>
                ))}
              </fieldset>
            ))}
            {/* Submit and cancel buttons */}
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600 mb-4"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-red-600 border-red-600 hover:bg-red-600 hover:text-white bg-white mb-4 ml-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const initialUserData = {
  userRegistration: {
    username: "",
    password: "",
    role: "user",
  },
  userData: {
    fullName: "",
    code: "",
    nationality: "",
    gender: "",
    religion: "",
    birthdate: "",
    nationalID: "",
    PlaceOfBirth: "",
    ReleaseDate: "",
    PlaceOfRelease: "",
  },
  userFamilyData: {
    GuardianName: "",
    job: "",
    city: "",
    address: "",
    homeTelephone: "",
    mobile: "",
    email: "",
    fax: "",
  },
  userContactData: {
    city: "",
    address: "",
    homeTelephone: "",
    mobile: "",
    email: "",
    fax: "",
    mailBox: "",
    systemMail: "",
  },
  userPreviousQualificationData: {
    school: "",
    qualification: "",
    GraduationYear: "",
    TheRoleOfTheQualification: "",
    TotalScores: "",
    ratio: "",
    sittingNumber: "",
    CoordinationApprovalNumber: "",
    CoordinationApprovalDate: "",
  },
  InTheEventOfTransferringToAnotherCollegeOrInstitute: {
    ThePartyFromWhichItIsTransferred: "",
    YearOfEnrollment: "",
  },
  TheSpecialtyHeWishesToJoin: {
    Desires: "",
  },
};
const isRequired = (section, fieldName) => {
  const requiredFields = [
    "username",
    "password",
    "fullName",
    "code",
    "nationality",
    "gender",
    "religion",
    "birthdate",
    "nationalID",
    "PlaceOfBirth",
  ];
  return (
    requiredFields.includes(fieldName) ||
    (section === "userContactData" &&
      ["city", "address", "mobile", "systemMail"].includes(fieldName))
  );
};

export default Page;
