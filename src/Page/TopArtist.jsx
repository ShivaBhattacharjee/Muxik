import React from "react";
import { TopArtists } from "../Utils/topplaylist";
import { SingleArtist } from "../components";

const TopArtist = () => {
  return (
    <div className="overflow-auto py-6  px-9 max-md:px-1 bg-[#2d1b69] h-screen pb-60">
      <h3 className=" text-neutral-300 text-3xl font-bold ml-9  max-md:ml-5 mb-5">
        Top Artists
      </h3>
      <div className=" flex flex-wrap justify-center items-center gap-2">
        {TopArtists.map((artist, index) => (
          <SingleArtist {...artist} key={index} />
        ))}
      </div>
    </div>
  );
};

export default TopArtist;
