import React, { useCallback, useState } from "react";
import { usePlayerContext } from "../Context/PlayerContext";
import ListItemButton from "@mui/material/ListItemButton";
import { SongDurtionFormat } from "../Utils/Helper";
import { SongDownloader } from "../components";
import Skeleton from "@mui/material/Skeleton";
import { LazyLoadImage } from 'react-lazy-load-image-component';
const SingleSongList = ({
  id,
  name,
  primaryArtists,
  primaryArtistsId = null,
  duration,
  index,
  image,
  album,
  title,
  CURRENT = null,
  playlistId = null,
}) => {
  const { HandlePlaySong,side_menu_show } = usePlayerContext();
  const [anchorEl] = useState(null);
  const [ImageLoading, SetImageLoading] = useState(true);
  const handleImageLoad = useCallback(() => {
    SetImageLoading(false);
  }, []);






  function ArtistFormatter(text) {
    let arr = text.split(",");
    return arr;
  }
  let primaryArtistsArr;
  let primaryArtistsIdArr;
  if (primaryArtistsId && primaryArtistsId) {
    primaryArtistsArr = ArtistFormatter(primaryArtists);
    primaryArtistsIdArr = ArtistFormatter(primaryArtistsId);
  }

  const open = Boolean(anchorEl);
  const idd = open ? "simple-popover" : undefined;

  return (
    <>
      <div className="relative">
        <ListItemButton
          sx={[
            {
              display: "grid",
              borderRadius: 2,
              gridTemplateColumns: "max-content 1fr max-content max-content",
              overflow: "hidden",
            },
            (theme) => ({
              "&:hover": {
                backgroundColor: "#1d242ca3",
              },
              [theme.breakpoints.down("sm")]: {
                paddingLeft: 1,
                paddingRight: "3px",
              },
            }),
          ]}
          data-id={id}
          className="grid relative overflow-hidden gap-3  max-md:gap-2 cursor-pointer   items-center px-5"
          onClick={() => HandlePlaySong(id, CURRENT)}
        >
          {ImageLoading && (
            <Skeleton
              width={50}
              height={50}
              sx={{ bgcolor: "#545454" }}
              variant="rounded"
            />
          )}
          <LazyLoadImage
            src={image[1].link}
            className={
              "w-14 rounded-lg object-cover " +
              (ImageLoading ? "hidden" : "block")
            }
            onLoad={handleImageLoad}
            alt={name}
          />
          <div className="ml-4 overflow-x-hidden md:w-screen max-md:w-1/2 max-xxs:w-1/3">
            <h3
              className="text-slate-200 max-md:font-medium text-sm  whitespace-nowrap text-ellipsis overflow-hidden w-[90%] max-xxs:w-2/4"
              dangerouslySetInnerHTML={{
                __html: `${name || title}`,
              }}
            />

            <p
              className="text-xs max-md:text-[10px]  opacity-90 mt-[2px] max-w-xs  overflow-hidden whitespace-nowrap text-ellipsis text-darkTextColor tracking-wide"
              dangerouslySetInnerHTML={{
                __html: `${primaryArtists}`,
              }}
            />
          </div>

          <div className="mr-36 max-md:mr-1 max-md:ml-8 max-md:hidden">
            {duration && (
              <div className="text-slate-200 text-sm opacity-70">
                {SongDurtionFormat(duration)}
              </div>
            )}
          </div>
        </ListItemButton>

        <div className={
          "absolute flex justify-center items-center right-4 top-0"+
          (side_menu_show ? "fixed -right-60" : "")
        }>
          <SongDownloader songId={id} />
        </div>
      </div>
    </>
  );
};

export default SingleSongList;
