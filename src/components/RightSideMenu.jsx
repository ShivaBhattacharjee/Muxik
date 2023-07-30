import React from "react";
import AudioPlayer from "./AudioPlayer";
import { usePlayerContext } from "../Context/PlayerContext";
import AudioPlayerHome from "./AudioPlayerHome";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const RightSideMenu = () => {
  const { side_menu_show, HandleRightSideMenu, current_song } = usePlayerContext();


  return (
    <section
    className={
      "bg-[#2d1b69] md:border-l-2 border-solid border-gray-600 text-darkTextColor z-20 fixed  max-md:z-40 max-md:p-0 h-full top-0 duration-75 py-10 right-0 px-10  " +
      (side_menu_show ? " w-96 max-md:w-full " : "w-0 -right-20")
    }
    >
      <div className="w-fit mt-14 max-md:mt-6 max-md:pl-4">
        {window.innerWidth <= 768 ? (
          <KeyboardArrowDownIcon
            className="max-md:scale-125 cursor-pointer"
            onClick={HandleRightSideMenu}
          />
        ) : (
          <KeyboardArrowRightIcon
            className="max-md:scale-125 cursor-pointer"
            onClick={HandleRightSideMenu}
          />
        )}
      </div>
      {!side_menu_show && current_song.name !== undefined && (
        <div className="fixed max-w-xl md:max-w-sm  m-auto left-0 right-0 bottom-0  rounded-t-xl bg-opacity-50 backdrop-blur-xl  bg-lightBlue h-28 text-white flex md:translate-x-1/4 border-solid border-t-2 border-gray-700">
          <AudioPlayerHome HandleRightSideMenu={HandleRightSideMenu} />
        </div>
      )}
      <AudioPlayer />
    </section>
  );
};

export default RightSideMenu;
