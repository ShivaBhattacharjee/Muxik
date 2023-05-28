import React from "react";
import { NavLink } from "react-router-dom";
import RippleButton from "ripple-effect-reactjs";

const PlaylistNavButtons = () => {
  return (
    <div className="overflow-auto px-10 mt-5">
      <ul className="flex gap-4 ">
        <li className="bg-[#1b103f] text-white rounded-md px-3 py-1 ">
          <NavLink to="/topplaylists/Hindi" className="h-fit w-fit">
            Hindi
          </NavLink>
        </li>
        <li className={"bg-[#1b103f] rounded-md text-white px-3 py-1 "}>
          <NavLink to="/topplaylists/Bhojpuri">Bhojpuri</NavLink>
        </li>
        <li className={"bg-[#1b103f] rounded-md text-white px-3 py-1 "}>
          <NavLink to="/topplaylists/English">English</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default PlaylistNavButtons;
