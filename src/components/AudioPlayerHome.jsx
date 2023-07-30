import React from "react";
import { usePlayerContext } from "../Context/PlayerContext";
import {  ImageFetch } from "../Utils/Helper";
const AudioPlayerHome = ({ HandleRightSideMenu }) => {
    const {
        current_song,
    } = usePlayerContext();
    return (
        <>
            <div className="flex justify-center items-center gap-2 " onClick={HandleRightSideMenu}>
            <div className="absolute top-2">
            <div className="bg-neutral-400 w-24 h-0.5 relative translate-x-1/2 rounded-xl mx-auto mb-1 cursor-pointer"></div>
                </div>
                <img
                    src={ImageFetch(current_song)}
                    alt="background"
                    className=" w-24 p-2 rounded-full animate-spin cursor-pointer"
                />

                <div>
                    <h3
                        className="truncate w-52 max-w-full text-lg"
                        dangerouslySetInnerHTML={{
                            __html: `${current_song.name}`,
                        }}
                    />
                    <p className=" text-sm max-md:text-base opacity-50 whitespace-nowrap w-40 overflow-hidden text-ellipsis">
                        {current_song.primaryArtists}
                    </p>
                </div>
            </div>
        </>
    )
}

export default AudioPlayerHome