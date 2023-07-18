import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { usePlayerContext } from "../Context/PlayerContext";
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

const SearchBar = () => {
  const navigate = useNavigate();
  const {
    SearchAll,
    inputValue,
    setInputValue,
    current_page_count,
    HandleSideNav,
    inputRef,
  } = usePlayerContext();

  const [searchTimer, setSearchTimer] = useState(null);

  function HandleSearch() {
    navigate("/search");
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
    clearTimeout(searchTimer);
    setSearchTimer(
      setTimeout(() => {
        if (event.target.value !== "") {
          SearchAll(inputValue, current_page_count);
          inputRef.current.blur();
        }
      }, 2500)
    );
  }

  function HandleSubmit(e) {
    if (e.key === "Enter" && e.target.value !== "") {
      clearTimeout(searchTimer);
      SearchAll(inputValue, current_page_count);
      inputRef.current.blur();
    }
  }

  function HandleSearchBtn() {
    if (inputRef.current.value !== "") {
      clearTimeout(searchTimer);
      SearchAll(inputValue, current_page_count);
      inputRef.current.blur();
    }
  }

  function clearSearchInput() {
    setInputValue("");
    inputRef.current.value = "";
  }

  return (
    <section className="flex items-center searchBarContainer gap-4 w-1/2 max-md:w-full md:w-full">
      <div className="w-fit hidden max-md:flex" onClick={HandleSideNav}>
          <MenuSharpIcon  className="text-slate-200 cursor-pointer" style={{fontSize:35}}/>
      </div>
      <div
        className="flex  items-center w-full focus-within:border-darkTextColor group transition-all duration-400 ease-linear rounded-lg pl-5 pr-1 h-12 bg-[#2d1b69] border-[#ffd4d46e]"
        onClick={HandleSearch}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={HandleSubmit}
          ref={inputRef}
          placeholder="Search your favourite song"
          className=" placeholder:text-sm bg-transparent placeholder:bg-transparent max-md:placeholder:text-xs text-sm w-full outline-none border-none  text-darkTitle font-light"
        />
        <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100  transition-all duration-200 ease-linear">
          <ClearRoundedIcon
            color="primary"
            className="scale-100 transition-all duration-300  ease-linear hover:scale-100 hover:opacity-100 cursor-pointer mr-1"
            onClick={clearSearchInput}
          />
        </div>
        <div
          className="text-white flex justify-end p-4"
          onClick={HandleSearchBtn}
        >
          <SearchIcon/>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
