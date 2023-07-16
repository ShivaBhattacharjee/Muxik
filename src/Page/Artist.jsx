import React, { useEffect } from "react";
import { LoadingSpinner, SongsList, MusicCard } from "../components";
import { useParams } from "react-router-dom";
import { useMusicContext } from "../Context/MusicContext";
import { ImageFetch, FollowersCount } from "../Utils/Helper";
import VerifiedIcon from "@mui/icons-material/Verified";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import RippleButton from "ripple-effect-reactjs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const Artist = () => {
  const { id } = useParams();
  const {
    getSingleArtist,
    single_artist_details: artist,
    single_artist_loading: loading,
    getArtistSongs,
    single_artist_songs,
    getArtistAlbums,
    single_artist_albums,
  } = useMusicContext();

  useEffect(() => {
    getSingleArtist(id);
    getArtistSongs(id);
    getArtistAlbums(id);
  }, [id]);

  if (loading) {
    return (
      <div className="text-2xl font-bold fixed inset-0 w-full h-full flex place-items-center justify-center bg-[#2d1b69] -z-20 max-md:pr-0 pr-32 md:translate-x-1/4 md:pr-48 lg:translate-x-0 ">
        <LoadingSpinner size={80} />
      </div>
    );
  }

  const HandleDownloadAll = () => {
    const btns = document.querySelectorAll(".btnss");
    btns.forEach((btn) => {
      btn.click();
    });
  };

  return (
    <div className="overflow-hidden bg-[#2d1b69] pb-52 ">
      <section>
        <div className="w-full md:grid lg:flex flex gap-6 px-16 pt-7 pb-10 sm:pb-2  max-md:flex-col relative overflow-hidden bg-[#1b103f]">
          <LazyLoadImage
            src={ImageFetch(artist)}
            className="rounded-xl absolute inset-0 -z-20 w-full blur-md h-full object-contain"
            alt=""
            effect="blur"
          />
          <LazyLoadImage
            effect="blur"
            src={ImageFetch(artist)}
            className="rounded-xl h-72 , flex justify-center items-center m-auto"
            alt=""
          />

          <div className=" self-center  flex justify-center items-center flex-col gap-2 mb-9 max-md:items-center">
            <h2 className="text-white font-medium text-lg lg:text-3xl md:text-2xl my-2 flex items-center">
              {artist.name}
              {artist.isVerified && (
                <VerifiedIcon color="primary" className="ml-1" />
              )}
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-slate-300 text-xs capitalize">
                {artist.dominantType}
              </p>
              <span className="block bg-slate-400 w-1 h-1 rounded-full"></span>

              <p className="text-slate-300 text-xs">
                {FollowersCount(artist.followerCount)} followers
              </p>
            </div>
            {artist.availableLanguages && (
              <div className="text-slate-200 text-xs flex flex-wrap max-md:justify-center">
                Languages:
                {artist.availableLanguages.map((item, index) => {
                  return (
                    <span
                      className="px-1 text-slate-300 text-xs capitalize"
                      key={index}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
            )}
            <div className="flex gap-4 mt-3 ">
              {artist.fb && (
                <a href={artist.fb} target="_blank">
                  <FacebookIcon
                    sx={{ color: "white" }}
                    className="opacity-70 hover:opacity-95 transition-all duration-700 ease-in-out"
                  />
                </a>
              )}
              {artist.twitter && (
                <a href={artist.twitter} target="_blank">
                  <TwitterIcon
                    sx={{ color: "white" }}
                    className="opacity-70 hover:opacity-95 transition-all duration-700 ease-in-out"
                  />
                </a>
              )}
            </div>
          </div>
        </div>
        <section className="mt-12 mx-12 max-md:mx-2">
          {single_artist_songs && (
            <div className="flex justify-between pr-5 items-center ">
              <h3 className="text-white text-lg ml-5 mb-3 max-md:font-semibold max-md:text-xl  ">
                Songs
              </h3>
              <div
                className="w-[38px] max-md:mt-4"
                title="Download all"
                onClick={HandleDownloadAll}
              >
                <RippleButton height={36} radius={50} color={"#5454548c"}>
                  <CloudDownloadIcon
                    sx={{ fontSize: 35 }}
                    className="text-neutral-300 cursor-pointer"
                  />
                </RippleButton>
              </div>
            </div>
          )}
          {single_artist_songs && (
            <SongsList songs={single_artist_songs} current={"Artist"} />
          )}
        </section>

        <section className="mt-12 mx-14 mb-14 max-md:mx-4">
          {single_artist_albums && (
            <h3 className="text-white text-lg ml-2 mb-4 max-md:font-semibold max-md:text-xl  ">
              Albums
            </h3>
          )}
          {single_artist_albums && (
            <div className="flex gap-6 overflow-scroll h-full">
              {single_artist_albums.map((item, index) => {
                return <MusicCard key={index} {...item} />;
              })}
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export default Artist;
