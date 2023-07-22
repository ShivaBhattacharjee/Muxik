import React from 'react';
import { useLoginContext } from '../Context/LoginContext';
import { useHistoryContext } from '../Context/HistoryContext';
import { usePlayerContext } from '../Context/PlayerContext';
const History = () => {
  const { loggedIn } = useLoginContext();
  const { songHistory, loading, error } = useHistoryContext();
  const { HandlePlaySong } = usePlayerContext();
  return (
    <div className='text-white bg-[#2d1b69] h-screen'>
      <h1 className='text-3xl font-bold text-center p-2 underline underline-offset-4'>Songs History</h1>
      {
        loggedIn&&(
          <p className='text-center p-4 text-xl font-bold'>Total :  {songHistory?.songs?.length} songs</p>
        )
      }
      <div className={`lg:flex ${loggedIn?"grid":"flex"} grid-cols-3 items-center gap-1 flex-wrap p-2`}>
        {loggedIn ? (
          loading ? (
            <h1>Loading</h1>
          ) : error ? (
            <p>Error fetching liked songs: {error}</p>
          ) : (
            songHistory.length === 0 ? (
              <p>No songs in history</p>
            ) : (
              songHistory?.songs?.map((song) => (
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
          <p className='w-full'>Sorry, this feature is only for logged-in users</p>
        )}
      </div>
    </div>
  );
};

export default History;
