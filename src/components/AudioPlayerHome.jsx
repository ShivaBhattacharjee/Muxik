import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import { usePlayerContext } from "../Context/PlayerContext";
import { AudioLinkSelector, ImageFetch } from "../Utils/Helper";
import SongDownloader from "./downloader/SongDownloader";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import UpNextSongs from "./UpNextSongs";
import { AnimatePresence, motion } from "framer-motion";
const AudioPlayerHome = ({ HandleRightSideMenu }) => {
    const {
        current_song,
        side_menu_show,
        audio_playing,
        current_playing_lists,
        singleSong,
    } = usePlayerContext();
    const [repeatOne, setRepeatOne] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [showUpNext, setShowUpNext] = useState(false);
    const songNameContainer = useRef(null);
    const [coverRadius, setCoverRadius] = useState(false);
    const songName = useRef(null);

    useEffect(() => {
        const songNameCon = songNameContainer.current;
        const songNamee = songName.current;
        if (songNameCon && songNamee) {
            if (songNamee.clientWidth > 200) {
                setShouldAnimate(true);
            } else {
                setShouldAnimate(false);
            }
        }
    }, [audio_playing, current_song]);


    const [audioProgress, setAudioProgress] = useState(0);
    const [paused, setPaused] = useState(false);
    const [musicTotalLength, setMusicTotalLength] = useState("00:00");
    const [musicCurrentTime, setMusicCurrentTime] = useState("00:00");

    const theme = useTheme();

    const handleMusicProgressBar = (e) => {
        setAudioProgress(e.target.value);
        currentAudio.current.currentTime =
            (e.target.value * currentAudio.current.duration) / 100;
    };

    const currentAudio = useRef();

    const handleAudioPlay = () => {
        if (currentAudio.current.paused) {
            currentAudio.current.play();
            setPaused(false);
        } else {
            currentAudio.current.pause();
            setPaused(true);
        }
    };

    const handleAudioUpdate = () => {
        if (currentAudio.current.currentTime === currentAudio.current.duration) {
            if (repeatOne) {
                singleSong(current_song.id);
                currentAudio.current.play();
            } else {
                if (current_playing_lists.length > 0) {
                    let IndexOfCurrentSong = current_playing_lists.indexOf(
                        current_song.id
                    );
                    if (IndexOfCurrentSong !== current_playing_lists.length - 1) {
                        singleSong(current_playing_lists[IndexOfCurrentSong + 1]);
                    } else {
                        setPaused(true);
                    }
                } else {
                    setPaused(true);
                }
            }
        }

        if (currentAudio.current.paused) {
            setPaused(true);
        } else {
            setPaused(false);
        }

        //input total length of the audio
        let minutes = Math.floor(currentAudio.current.duration / 60);
        let seconds = Math.floor(currentAudio.current.duration % 60);
        let musicTotalLength = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0:${seconds}` : seconds
            }`;
        setMusicTotalLength(musicTotalLength);

        //input current time of the audio
        let min = Math.floor(currentAudio.current.currentTime / 60);
        let sec = Math.floor(currentAudio.current.currentTime % 60);
        let musicCurrent = `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec
            }`;
        setMusicCurrentTime(musicCurrent);

        //progress bar increase as music play
        const progress = parseInt(
            (currentAudio.current.currentTime / currentAudio.current.duration) * 100
        );
        setAudioProgress(isNaN(progress) ? 0 : progress);
    };

    const HandleNextSong = () => {
        if (current_playing_lists.length > 0) {
            let IndexOfCurrentSong = current_playing_lists.indexOf(current_song.id);
            if (IndexOfCurrentSong !== current_playing_lists.length - 1) {
                singleSong(current_playing_lists[IndexOfCurrentSong + 1]);
            }
        }
    };

    const HandlePreviousSong = () => {
        if (current_playing_lists.length > 0) {
            let IndexOfCurrentSong = current_playing_lists.indexOf(current_song.id);
            if (IndexOfCurrentSong !== 0) {
                singleSong(current_playing_lists[IndexOfCurrentSong - 1]);
            }
        }
    };

    if (!audio_playing) {
        return null;
    }
    return (
        <>
            <div className="flex justify-center items-center gap-2">
                <img
                    src={ImageFetch(current_song)}
                    alt="background"
                    className=" w-28 p-2 rounded-full animate-spin"
                    onClick={HandleRightSideMenu}
                />
                <div>
                    <h3
                        className="truncate w-52 max-w-full text-lg"
                        ref={songName}
                        dangerouslySetInnerHTML={{
                            __html: `${current_song.name}`,
                        }}
                    />
                    <p className=" text-sm max-md:text-base opacity-50 whitespace-nowrap w-40 overflow-hidden text-ellipsis">
                        {current_song.primaryArtists}
                    </p>
                    <div className="max-md:scale-90 max-md:mb-0 ">
                        <IconButton
                            aria-label="previous song"
                            onClick={HandlePreviousSong}
                            sx={{
                                ":hover": {
                                    bgcolor: "#2a2a2abf",
                                },
                            }}
                        >
                            <FastRewindRounded fontSize="2rem" htmlColor="#8e9196" />
                        </IconButton>
                        <IconButton
                            sx={{
                                ":hover": {
                                    bgcolor: "#2a2a2abf",
                                },
                            }}
                            aria-label={paused ? "play" : "pause"}
                            onClick={handleAudioPlay}
                        >
                            {paused ? (
                                <PlayArrowRounded sx={{ fontSize: "3rem" }} htmlColor="#8e9196" />
                            ) : (
                                <PauseRounded sx={{ fontSize: "3rem" }} htmlColor="#8e9196" />
                            )}
                        </IconButton>
                        <IconButton
                            sx={{
                                ":hover": {
                                    bgcolor: "#2a2a2abf",
                                },
                            }}
                            aria-label="nextsong"
                            onClick={HandleNextSong}
                        >
                            <FastForwardRounded fontSize="2rem" htmlColor="#8e9196" />
                        </IconButton>
                        <IconButton
                            sx={{
                                ":hover": {
                                    bgcolor: "#2a2a2abf",
                                },
                                marginLeft: "10px",
                            }}
                            onClick={() => setRepeatOne((prev) => !prev)}
                        >
                            {repeatOne ? (
                                <RepeatOneIcon fontSize="2rem" htmlColor="#8e9196" />
                            ) : (
                                <RepeatIcon fontSize="2rem" htmlColor="#8e9196" />
                            )}
                        </IconButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AudioPlayerHome