import React from "react";
import ExploreIcon from "@mui/icons-material/Explore";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { NavLink } from "react-router-dom";
import { usePlayerContext } from "../Context/PlayerContext";
import InfoIcon from "@mui/icons-material/Info";
import LogoText from "./assets/LogoText";
import { SubscriptionsOutlined } from "@mui/icons-material";

const SideNav = () => {
  const { HandleSideNav, side_navbar_show } = usePlayerContext();
  return (
    <div className={"float-left w-52 h-[26rem] max-md:w-0 select-none"}>
      <div
        className={
          "bg-[#1b103f] text-darkTextColor top-0  w-52 transition-all duration-200 ease-linear  fixed z-50 h-full  py-10 " +
          (side_navbar_show ? "max-md:w-64 left-0" : "max-md:-left-52")
        }
      >
        <section className="px-7 max-md:px-10 ">
          <section className="scale-105">
            <LogoText />
          </section>

          <section className="mt-6">
            <h3 className="uppercase font-Rubik font-medium tracking-wider max-md:text-lg text-sm">
              Menu
            </h3>
            <ul className="flex flex-col gap-6 mt-5">
              <NavLink
                onClick={HandleSideNav}
                to={"/"}
                className="flex items-center gap-4 text-sm max-md:text-base font-medium"
              >
                <ExploreIcon />
                Discover
              </NavLink>
              <NavLink
                onClick={HandleSideNav}
                to={"/topartist"}
                className="flex items-center gap-4 text-sm max-md:text-base font-medium"
              >
                <AccountBoxIcon />
                Top Artists
              </NavLink>
              <NavLink
                onClick={HandleSideNav}
                to={"topplaylists/Hindi"}
                className="flex items-center gap-4 text-sm max-md:text-base font-medium"
              >
                <AssessmentIcon />
                Top Playlists
              </NavLink>
            </ul>
          </section>
          <section>
          <ul className="flex flex-col gap-6 mt-5">
            <NavLink
              onClick={HandleSideNav}
              to={"/userplaylists"}
              className="flex items-center  gap-4 text-sm max-md:text-base font-medium"
            >
              <SubscriptionsOutlined/>
              Your Playlists
            </NavLink>
          </ul>
          </section>
        </section>
        
        <hr className="bg-[#1b103f] h-[0.8px] opacity-10 my-6 px-7" />
        <section className="px-7 max-md:px-10 mt-5">
          <ul className="flex flex-col gap-6 mt-2">
            <NavLink
              onClick={HandleSideNav}
              to={"/about"}
              className="flex items-center gap-4 text-sm max-md:text-base font-medium"
            >
              <InfoIcon /> Help & Support
            </NavLink>
          </ul>
          {/* <button>Dark</button> */}
        </section>
        <div className="absolute bottom-0  flex justify-center right-0 left-0">
        </div>
      </div>
      <div
        className={
          "fixed z-30 h-full max-md:block hidden top-0 w-full bg-[#0c0c0cc7] transition-all duration-200 ease-in " +
          (side_navbar_show ? "visible opacity-100" : "invisible opacity-0")
        }
        onClick={HandleSideNav}
      ></div>
    </div>
  );
};

export default SideNav;
