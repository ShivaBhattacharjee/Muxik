import React from "react";
import ExploreIcon from "@mui/icons-material/Explore";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { usePlayerContext } from "../Context/PlayerContext";
import LogoText from "./assets/LogoText";
import GitHubIcon from '@mui/icons-material/GitHub';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useLoginContext } from "../Context/LoginContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useUserDetailsContext } from "../Context/UserDetailsContext";
const SideNav = () => {
  const { HandleSideNav, side_navbar_show } = usePlayerContext();
  const {loggedIn , username} = useLoginContext()
  const {data} = useUserDetailsContext()
  
  return (
    <div className={"float-left w-52 h-[26rem] max-md:w-0 select-none"}>
      <div
        className={
          "bg-[#1b103f] border-r-2 border-solid border-gray-700 text-darkTextColor top-0  w-52 transition-all duration-200 ease-linear  fixed z-50 h-full  py-10 " +
          (side_navbar_show ? "max-md:w-64 left-0" : "max-md:-left-52")
        }
      >
        <section className="px-7 max-md:px-10 ">
          <section className="scale-105">
            <Link
              onClick={HandleSideNav}
              className="text-white"
              to={"/"}
            >
              <LogoText />
            </Link>

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
              <hr className="bg-white" />
              <h3 className="uppercase font-Rubik font-medium tracking-wider max-md:text-lg text-sm">
                Collection
              </h3>
              <NavLink
                onClick={HandleSideNav}
                to={"/liked-songs"}
                className="flex items-center gap-4 text-sm max-md:text-base font-medium"
              >
                <ThumbUpIcon />
                Liked Songs
              </NavLink>


              <NavLink
                onClick={HandleSideNav}
                to={"/history"}
                className="flex items-center gap-4 text-sm max-md:text-base font-medium"
              >
                <HistoryIcon />
                History
              </NavLink>
              <hr className="bg-white" />
              <h3 className="uppercase font-Rubik font-medium tracking-wider max-md:text-lg text-sm">
                FAQ
              </h3>
              <NavLink
                onClick={HandleSideNav}
                to={"/faq"}
                className="flex items-center gap-4 text-sm max-md:text-base font-medium"
              >
                <QuestionMarkIcon/>
                Questions
              </NavLink>
              <hr className="bg-white" />
              {loggedIn ? (
                <div
                className="bg-blue-500 cursor-pointer text-white p-3  gap-2  text-lg  rounded-full drop-shadow-2xl hover:translate-x-2 duration-150 transition-all "
                onClick={HandleSideNav}
              >
                <Link to={"/profile"} className="flex items-center justify-start gap-5 ">
               <img src={data?.profile} alt="user-profile" className="w-12 lg:w-8 rounded-full" />
                <span className="text-2xl lg:text-xl">{username}</span>
                </Link>
              </div>
              ):(
                <Link
                onClick={HandleSideNav}
                to={"/login"}
                className="bg-blue-500 text-white p-3 flex gap-2  text-lg items-center rounded-lg justify-center"
              >
                <LockOpenIcon />
                Login
              </Link>
              )}
            </ul>
          </section>

          <section>
          </section>
        </section>
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
