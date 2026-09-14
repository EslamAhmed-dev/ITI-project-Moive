import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";

function SearchBar() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [input, setInput] = useState(query);
  const navigate = useNavigate();

  useEffect(() => {
    setInput(query);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
   
    navigate(`/search?query=${encodeURIComponent(input.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className="d-flex me-3 flex-grow-1">
      <input
        type="text"
        className="form-control me-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for a movie or TVShow..."
      />
      <button type="submit" className="btn btn-outline-light">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
