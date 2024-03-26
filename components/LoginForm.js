import PasswordInput from "./password";

const LoginForm = ({
    handleSubmit,
    setUsername,
    password,
    setPassword,
    role,
    setRole,
    loading,
}) => {
    return (
        <div className="form-container bg-white shadow p-6 rounded">
            {loading && <div className="loading"></div>}
            <h2 className="mb-3 text-blue-600 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        <strong>Username</strong>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        className="block appearance-none w-full h-9 py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                        id="username"
                        onChange={setUsername}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        <strong>Password</strong>
                    </label>
                    <PasswordInput value={password} onChange={setPassword} />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                        <strong>Role</strong>
                    </label>
                    <select
                        className="form-select focus:outline-none block w-full h-9 py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                        id="role"
                        value={role}
                        onChange={setRole}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="d-grid">
                    <button
                        type="submit"
                        className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
