import React from "react";
import { topHindiPlaylist } from "../../Utils/topplaylist";
import { SingleTopPlaylists } from "..";
import PlaylistNavButtons from "./PlaylistNavButtons";

const HindiPlaylist = () => {
  return (
    <div className="bg-[#2d1b69] h-screen overflow-x-hidden pb-60">
      <PlaylistNavButtons />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] max-md:grid-cols-[repeat(auto-fit,minmax(122px,0fr))] max-md:px-2 max-md:justify-center my-8  gap-x-1 gap-y-4 overflow-auto px-10 ">
        {topHindiPlaylist.map((item, index) => {
          return <SingleTopPlaylists {...item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default HindiPlaylist;
