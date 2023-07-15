import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SongsList, LoadingSpinner } from "../components";
import { useMusicContext } from "../Context/MusicContext";
import { ImageFetch, FollowersCount } from "../Utils/Helper";
import Skeleton from "@mui/material/Skeleton";
import { usePlayerContext } from "../Context/PlayerContext";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import RippleButton from "ripple-effect-reactjs";

const SinglePlayLists = () => {
  const { side_menu_show } = usePlayerContext();
  const [ImageLoading, SetImageLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const {
    getSinglePlaylist,
    currentPlaylists,
    single_album_loading: loading,
  } = useMusicContext();
  let { id } = useParams();
  useEffect(() => {
    getSinglePlaylist(id);
  }, [id]);

  if (loading) {
    return (
      <div className="text-2xl font-bold fixed inset-0 w-full h-full flex place-items-center justify-center bg-[#2d1b69] -z-20 max-md:pr-0 pr-32 md:translate-x-1/4 md:pr-48 lg:tranm">
        <LoadingSpinner size={80} />
      </div>
    );
  }

  const handleImageLoad = () => {
    SetImageLoading(false);
  };

  const HandleDownloadAll = () => {
    const btns = document.querySelectorAll(".btnss");
    btns.forEach((btn) => {
      btn.click();
    });
  };

  let timeoutId;
  const HandleAlert = () => {
    setAlert(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      setAlert(false);
    }, 5000);
  };

  return (
    <div
      className={
        "bg-[#2d1b69] h-screen overflow-x-hidden pb-52 " +
        (side_menu_show ? "mr-96 transition-all duration-300 ease-in" : "mr-0")
      }
    >
      <div className="bg-[#1b103f] flex flex-col gap-8 w-full pt-3 px-16 max-md:px-5  ">
        <div className="grid grid-cols-[max-content,auto] mt-7 max-md:grid-cols-1  max-md:place-items-center gap-5">
          {ImageLoading && (
            <Skeleton
              width={160}
              height={170}
              sx={{ bgcolor: "##2d1b69" }}
              variant="rounded"
            />
          )}
          <img
            src={ImageFetch(currentPlaylists)}
            alt={currentPlaylists.name}
            onLoad={handleImageLoad}
            className={
              "w-56 shadow-xl max-md:w-34 rounded-md " +
              (ImageLoading ? "hidden" : "block")
            }
          />

          <div className="flex place-content-end max-md:place-items-center flex-col ">
            <h2 className="font-bold text-4xl max-md:text-2xl max-md:text-center text-white tracking-wider md:tracking-tighter">
              {currentPlaylists.name}
            </h2>
            <div className="flex max-md:flex-col items-center gap-3 my-2 max-md:mt-4">
              <p className="text-slate-200 text-sm max-md:text-xs">
                {FollowersCount(currentPlaylists.followerCount)} followers
              </p>
              <div className="bg-darkTextColor rounded-full max-md:text-xs w-1 h-1 max-md:hidden"></div>
              <p className="text-slate-200 text-sm">
                {currentPlaylists.songCount} songs
              </p>

              <div
                className="w-[38px] ml-3 max-md:mt-4"
                onClick={HandleDownloadAll}
                tiltle="Download all "
              >
                <RippleButton height={36} radius={50} color={"#5454548c"}>
                  <CloudDownloadIcon
                    sx={{ fontSize: 35 }}
                    className="text-neutral-300 cursor-pointer"
                  />
                </RippleButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="mx-3 lg:mx-12 mt-6 md:mx-1.5  mb-14 bg-[#1b103f]">
        {currentPlaylists.songs && (
          <SongsList songs={currentPlaylists.songs} current={"Playlist"} />
        )}
      </section>
    </div>
  );
};

export default SinglePlayLists;
