import PasswordInput from "@/components/PasswordInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const ChangePasswordModal = ({ id, showModal, setShowModal }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleCloseModal = () => {
    if (!loading) {
      setShowModal(false);
      setOldPassword("");
      setNewPassword("");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (loading || submitDisabled) return;

    setLoading(true);
    setSubmitDisabled(true);

    try {
      const response = await axios.put(`/api/user/${id}/change-password`, {
        oldPassword,
        newPassword,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Password changed successfully",
          icon: "success",
        });
        setOldPassword("");
        setNewPassword("");
        setLoading(false);
        setShowModal(false);
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "Network error occurred";
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
    } finally {
      setLoading(false);
      setSubmitDisabled(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-10 ${
        showModal ? "" : "hidden"
      }`}
    >
      <div
        className="absolute inset-0 bg-black opacity-25 cursor-pointer"
        onClick={handleCloseModal}
      ></div>
      <div className="bg-light dark:bg-dark border border-dark dark:border-light rounded-lg p-6 z-50 transition-all">
        {loading && <LoadingSpinner />}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Change Password</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="oldPassword" className="block mb-2">
                Old Password
              </label>
              <PasswordInput
                id={"oldPassword"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block mb-2">
                New Password
              </label>
              <PasswordInput
                id={"newPassword"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-light-red border-light-red hover:bg-light-red hover:text-lighter mb-4 ml-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-block align-middle text-center select-none font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-dark-blue text-lighter hover:bg-light-blue mb-4"
                onClick={handleChangePassword}
                disabled={submitDisabled}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
