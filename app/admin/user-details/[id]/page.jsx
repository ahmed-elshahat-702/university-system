"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingButton from "@/components/LoadingButton";

import "@/styles/EditButton.css";
import "@/styles/SaveButton.css";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Page = ({ params }) => {
  const { id } = params;

  const router = useRouter();

  const [userData, setUserData] = useState({});
  const [editableField, setEditableField] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef(null);

  const fetchData = async () => {
    try {
      if (!id) {
        return;
      }
      const response = await axios.get(`/api/admin/user-details/${id}`);
      setUserData(response.data ?? {});
      setIsLoading(false);
    } catch (error) {
      Swal.fire(
        "Error",
        "Failed to fetch user details. Please try again later.",
        "error"
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const adminData = sessionStorage.getItem("AdminData");
    if (!adminData) {
      Swal.fire({
        icon: "warning",
        title: "Please login first",
        text: "You need to login to access the admin page",
        willClose: () => {
          router.push("/");
        },
      });
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (editableField) {
      inputRef.current.focus();
    }
  }, [editableField]);

  const handleEdit = (section, fieldName) => {
    if (fieldName !== "role") {
      setEditableField({ section, fieldName });
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [editableField.section]: {
        ...prevUserData[editableField.section],
        [editableField.fieldName]: value,
      },
    }));
  };

  const handleSave = async (section, fieldName) => {
    try {
      const updatedData = {
        [section]: {
          [fieldName]: userData[section][fieldName],
        },
      };

      // Show processing message
      Swal.fire({
        title: "Processing...",
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Merge the updated field with the existing userData
      const updatedUserData = { ...userData, ...updatedData };

      await axios.put(`/api/admin/user-details/${id}`, updatedUserData);

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Data updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      setEditableField(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    }
  };

  const handleBackToDashboard = () => {
    router.back();
  };

  return (
    <div className="user-details-page">
      <nav className="fixed top-0 w-full flex items-center justify-between py-3 px-4 bg-lighter dark:bg-darker border-b border-light dark:border-dark shadow dark:shadow-dark z-50 transition">
        <h1 className="font-bold uppercase">User Details</h1>
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <button
            onClick={handleBackToDashboard}
            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-light-red border-light-red hover:text-lighter hover:bg-light-red"
          >
            Back to Dashboard
          </button>
        </div>
      </nav>
      <div className="px-6 pt-24 pb-4">
        {isLoading ? (
          <LoadingButton />
        ) : (
          Object.entries(userData)
            .filter(([section]) => section !== "_id" && section !== "__v")
            .map(([section, fields]) => (
              <fieldset key={section} className="mb-4">
                <legend className="font-medium w-full">
                  {section.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase()}
                </legend>
                <div className="flex flex-wrap">
                  {Object.entries(fields).map(([fieldName, fieldValue]) => (
                    <div
                      key={fieldName}
                      className="mb-3 w-full sm:w-1/2 md:w-1/3 pr-4 pl-4 lg:w-1/4"
                    >
                      {fieldName === "role" ? null : (
                        <label className="form-label">
                          {fieldName
                            .replace(/([a-z])([A-Z])/g, "$1 $2")
                            .toLowerCase()}
                          :
                        </label>
                      )}

                      <div className="flex gap-2">
                        {fieldName === "role" ? null : editableField &&
                          editableField.section === section &&
                          editableField.fieldName === fieldName ? (
                          <input
                            type="text"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal border border-gray rounded"
                            name={fieldName}
                            value={fieldValue}
                            onChange={handleInputChange}
                            ref={inputRef}
                          />
                        ) : (
                          <span className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal border dark:bg-dark border-gray rounded">
                            {fieldValue}
                          </span>
                        )}
                        {fieldName !== "role" &&
                        (!editableField ||
                          editableField.section !== section ||
                          editableField.fieldName !== fieldName) ? (
                          <button
                            onClick={() => handleEdit(section, fieldName)}
                            className="edit-button inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-dark-blue border-dark-blue hover:text-lighter  hover:bg-dark-blue edit-button"
                          >
                            Edit
                          </button>
                        ) : null}
                        {editableField &&
                        editableField.section === section &&
                        editableField.fieldName === fieldName ? (
                          <button
                            onClick={() => handleSave(section, fieldName)}
                            className="save-button inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-dark-blue border-dark-blue hover:bg-dark-blue hover:text-lighter bg-lighter save-button"
                          >
                            Save
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>
            ))
        )}
      </div>
    </div>
  );
};

export default Page;
