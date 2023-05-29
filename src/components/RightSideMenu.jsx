import React from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import AudioPlayer from "./AudioPlayer";
import { usePlayerContext } from "../Context/PlayerContext";
import AudioPlayerHome from "./AudioPlayerHome";

const RightSideMenu = () => {
  const { side_menu_show, HandleRightSideMenu, current_song } = usePlayerContext();
  return (
    <section
      className={
        "bg-[#2d1b69] text-darkTextColor z-20 fixed  max-md:z-50 max-md:p-0 h-full top-0 py-10 right-0 transition-all duration-300 ease-in  px-10 " +
        (side_menu_show ? "w-96 max-md:w-full " : "w-0 -right-20")
      }
    >
      <div className="w-fit mt-14 max-md:mt-6 max-md:pl-4">
        <KeyboardDoubleArrowLeftIcon
          className="rotate-180 max-md:scale-125 cursor-pointer"
          onClick={HandleRightSideMenu}
        />
      </div>
      {!side_menu_show && current_song.name !== undefined &&  (
        <div className="fixed max-w-xl m-auto left-0 right-0 bottom-0  rounded-t-xl bg-opacity-50 backdrop-blur-xl  bg-lightBlue h-32 text-white flex">
          <AudioPlayerHome HandleRightSideMenu={HandleRightSideMenu}/>
        </div>
      )}
      <AudioPlayer />
    </section>
  );
};

export default RightSideMenu;
