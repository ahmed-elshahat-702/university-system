import PasswordInput from "@/components/password";
import "@/styles/Loading.css"


const ChangePasswordModal = ({
    handleChangePassword,
    handleCloseModal,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    loading
}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="absolute inset-0 bg-black opacity-25"></div>
            <div className="bg-white rounded-lg p-6 z-50">
                {loading && <div className="loading"></div>}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Change Password</h2>
                </div>
                <form>
                    <div className="mb-4">
                        <label className="block mb-2">Old Password</label>
                        <div className="relative flex items-stretch w-full">
                            <PasswordInput
                                value={oldPassword}
                                onChange={setOldPassword}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">New Password</label>
                        <div className="relative flex items-stretch w-full">
                            <PasswordInput
                                value={newPassword}
                                onChange={setNewPassword}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-500 hover:bg-gray-700 text-white rounded-lg px-4 py-2 mr-2"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
                            onClick={handleChangePassword}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
