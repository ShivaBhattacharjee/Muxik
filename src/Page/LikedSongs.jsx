import React from 'react';
import { useLikedSongs } from '../Context/LikedSongsContext';
import { useLoginContext } from "../Context/LoginContext";

const LikedSongs = () => {
  const { likedSongs, error, loading } = useLikedSongs();
  const { loggedIn } = useLoginContext();

  return (
    <div className='text-white bg-[#2d1b69] h-screen'>
      <h1 className='text-3xl font-bold text-center p-2 underline underline-offset-4'>Liked Songs</h1>
      {loggedIn ? (
        loading ? (
          <h1>Loading</h1>
        ) : error ? (
          <p>Error fetching liked songs: {error}</p>
        ) : (
          likedSongs.length === 0 ? (
            <p>No liked songs</p>
          ) : (
            likedSongs.slice().reverse().map((song) => (
              <div key={song?._id}>
                <h3>{song?.songName}</h3>
                <h1>{song?.banner}</h1>
              </div>
            ))
          )
        )
      ) : (
        <p>Sorry, this feature is only for logged-in users</p>
      )}
    </div>
  );
};

export default LikedSongs;
