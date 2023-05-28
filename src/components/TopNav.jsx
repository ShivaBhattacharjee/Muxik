import React from "react";
import SearchBar from "./SearchBar";

const TopNav = () => {
  return (
    <div className=" border-b-2 border-slate-100 border-opacity-10 h-20">
      <div className="h-20 flex items-center px-9 max-md:px-4 justify-between fixed z-40 backdrop-blur-sm bg-[#1b103f] bg-opacity-60 right-0 left-0 ml-52 max-md:ml-0 top-0">
        <SearchBar />
      </div>
    </div>
  );
};

export default TopNav;
