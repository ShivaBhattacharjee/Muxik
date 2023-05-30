import React from "react";
import { usePlayerContext } from "../Context/PlayerContext";
import {  ImageFetch } from "../Utils/Helper";
const AudioPlayerHome = ({ HandleRightSideMenu }) => {
    const {
        current_song,
    } = usePlayerContext();
    return (
        <>
            <div className="flex justify-center  items-center gap-2 "                     onClick={HandleRightSideMenu}>
                <img
                    src={ImageFetch(current_song)}
                    alt="background"
                    className=" w-28 p-2 rounded-full animate-spin"
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