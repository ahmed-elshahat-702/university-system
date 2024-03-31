import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = ({ users, setFilteredUsers }) => {
  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredResults = users.filter((user) =>
      user.userRegistration?.username.toLowerCase().includes(searchQuery)
    );
    setFilteredUsers(filteredResults);
  };

  return (
    <div className="search-container relative">
      <input
        type="text"
        placeholder="Search users..."
        onChange={handleSearch}
        className="border border-gray-300 rounded-md px-3 py-1 pl-8 outline-none focus:border-2 focus:border-blue-500"
      />
      <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
        <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
      </span>
    </div>
  );
};

export default Search;
