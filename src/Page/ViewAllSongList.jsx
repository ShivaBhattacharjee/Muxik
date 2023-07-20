import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SongsList } from "../components";
import { usePlayerContext } from "../Context/PlayerContext";
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader from "react-spinners/ClipLoader";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import RippleButton from "ripple-effect-reactjs";

const ViewAllSongList = () => {
  let { keyword } = useParams();
  const { SearchSongs, search_songs, HandleNextPageBtn, has_more } =
    usePlayerContext();
  useEffect(() => {
    SearchSongs(keyword);
  }, [keyword]);

  const HandleDownloadAll = () => {
    const btns = document.querySelectorAll(".btnss");
    btns.forEach((btn) => {
      btn.click();
    });
  };

  return (
    <div className="bg-[#2d1b69] h-auto">
      <section className=" p-16 flex rounded-b-2xl relative bg-[#1b103f] ">
        <h1 className="text-4xl text-white">All songs</h1>
      </section>
      <InfiniteScroll
        dataLength={search_songs.length}
        next={() => HandleNextPageBtn(keyword)}
        hasMore={has_more}
        loader={
          <h4 className="text-white text-center mb-3 ">
            <ClipLoader size={30} color="#2764eb" speedMultiplier={3} />
          </h4>
        }
        endMessage={<p className="text-white text-center">End</p>}
        className=" px-14 max-md:px-2"
      >
        <div className="text-neutral-200 mb-2 text-center flex justify-end px-5 ">
          <div
            className="p-3 flex  bg-[#1b103f] mt-4 rounded-lg text-center"
            onClick={HandleDownloadAll}
            title="Download all"
          >
            <RippleButton radius={10} color={"#5454548c"}>
              Download All
              <CloudDownloadIcon
                sx={{ fontSize: 28, paddingLeft: 1, paddingBottom: 1 }}
                className="text-neutral-300 cursor-pointer"
              />
            </RippleButton>
          </div>
        </div>
        {search_songs && (
          <SongsList songs={search_songs} current={"ViewAllSong"} />
        )}
      </InfiniteScroll>
    </div>
  );
};

export default ViewAllSongList;
