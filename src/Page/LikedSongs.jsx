import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useLikedSongs } from '../Context/LikedSongsContext';
import { useLoginContext } from "../Context/LoginContext";
import { usePlayerContext } from '../Context/PlayerContext';
import {LoadingSpinner} from "../components"
const LikedSongs = () => {
  const { likedSongs, error, loading, fetchLikedSongs } = useLikedSongs();
  const { loggedIn, username } = useLoginContext();
  const { HandlePlaySong } = usePlayerContext();
  useEffect(() => {
    if (username !== null && loggedIn) {
      fetchLikedSongs(username);
    }
  }, [username]);
  return (
    <div className='text-white bg-[#2d1b69] h-screen'>
      <h1 className='text-3xl font-bold text-center p-2 underline underline-offset-4'>Liked Songs</h1>
      <div className={`lg:flex  ${loggedIn && likedSongs.length !== 0 ?"grid":"flex"} grid-cols-3 items-center gap-1 flex-wrap p-2`}>
        {loggedIn ? (
          loading ? (
            <div className='w-screen flex justify-center items-center h-[60vh]'>
            <LoadingSpinner size={80}/>
            </div>
          ) : error ? (
            <p>Error fetching liked songs: {error}</p>
          ) : (
            likedSongs.length === 0 ? (
              <p className='text-center w-full text-2xl font-bold flex h-[60vh] justify-center items-center'>No liked songs</p>
            ) : (
              likedSongs.slice().reverse().map((song) => (
                <div key={song?._id} className=''>
                  <div className='p-2'>
                    <img src={song?.banner} alt={song?.songName} className='w-28 cursor-pointer hover:scale-105 duration-75 rounded-lg lg:w-36' onClick={()=>HandlePlaySong(song?.songId)} />
                    <h4
                      className="whitespace-nowrap overflow-hidden text-ellipsis w-28 text-darkSongname text-sm mt-2 px-1"
                      title={song?.songName}
                      dangerouslySetInnerHTML={{
                        __html: `${song?.songName}`,
                      }}
                    />
                  </div>
                </div>
              ))
            )
          )
        ) : (
          <div className='w-full flex justify-center text-center items-center flex-col gap-3 h-[70vh] lg:h-[80vh]'>
          <p className='font-semibold text-2xl'>Please , Login To Use This feature 👉👈</p>
          <Link to="/login">
          <button className='bg-blue-500 p-2  rounded-lg w-32 font-semibold text-xl m-2'>Login</button>
          </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedSongs;
