import React from 'react';
import { useLoginContext } from '../Context/LoginContext';
import { useHistoryContext } from '../Context/HistoryContext';

const History = () => {
  const { loggedIn } = useLoginContext();
  const { songHistory, loading, error } = useHistoryContext();

  return (
    <div className='text-white bg-[#2d1b69] h-screen'>
      {loggedIn ? (
        <div>
          <h1>Welcome</h1>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error fetching song history: {error}</p>
          ) : (
            <div>
              <h2>Song History:</h2>
              {songHistory?.songs?.map((song) => (
                <div key={song._id}>
                  <h3>{song.songName}</h3>
                  <h4>{song.banner}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <h1>Account bna le bsdk</h1>
      )}
    </div>
  );
};

export default History;
