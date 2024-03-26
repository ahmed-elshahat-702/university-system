import { FaSearch } from "react-icons/fa";

const SearchInput = ({ onSearch, searchTerm, setSearchTerm }) => {
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };
    return (
        <form onSubmit={handleSubmit} className="flex me-4">
            <input
                type="text"
                placeholder="Search by username"
                value={searchTerm}
                onChange={handleChange}
                className="border rounded px-2 py-1"
            />
            <button
                type="submit"
                className="px-3 py-1 bg-white text-blue-600 border rounded"
            >
                <FaSearch />
            </button>
        </form>
    );
};

export default SearchInput;
