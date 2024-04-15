import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = ({ users = [], setFilteredUsers }) => {
  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredResults = users.filter((user) =>
      user.userRegistration?.username.toLowerCase().includes(searchQuery)
    );
    setFilteredUsers(filteredResults);
  };

  const clearSearch = () => {
    setFilteredUsers(users);
    document.getElementById("search-input").value = "";
  };

  return (
    <div className="search-container w-full sm:w-auto relative">
      <label htmlFor="search-input" className="sr-only">
        Search users
      </label>
      <input
        type="text"
        id="search-input"
        placeholder="Search users..."
        onChange={handleSearch}
        className="w-full border border-dark rounded-md px-3 py-1 pl-8 outline-none focus:border-dark-blue"
      />
      <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
        <FontAwesomeIcon icon={faSearch}/>
      </span>
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-2 flex items-center"
        onClick={clearSearch}
        title="Clear search"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default Search;
