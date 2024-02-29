import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function SearchInput({ isInNavBar, handleSearch}) {
  const [searchInput, setSearchInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();


  useEffect(() => {
    // Update the searchInput when the "q" parameter changes in the URL
    const q = searchParams.get("q");
    setSearchInput(q || ''); // Set it to an empty string if "q" is not in the URL
  }, [searchParams]);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value)
    // setSearchParams({q: event.target.value}, {replace: true})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchInput);
    navigate(`/search?q=${searchInput.toString()}`)
  };

  const inputClass = `border rounded-lg py-2 px-4 mx-2 ${isInNavBar ? 'w-64 h-8' : 'w-80'}`;
  const buttonClass = `btn ${isInNavBar ? 'btn-sm bg-stone-600' : 'bg-violet-700'}`;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row justify-center items-center"
    >
      <input
        type="text"
        id="q"
        placeholder="Search for cards, box sets.. "
        value={searchInput}
        onChange={handleInputChange}
        className={inputClass}
      />
      <button type="submit" className={buttonClass}>
        Search
      </button>
    </form>
  );
}
