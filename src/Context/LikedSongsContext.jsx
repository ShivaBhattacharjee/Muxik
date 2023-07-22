// LikedSongsContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import BackEndService from '../services/BackEndService'; // Update the path accordingly
import { useLoginContext } from './LoginContext';

const LikedSongsContext = createContext();

export const useLikedSongs = () => {
  return useContext(LikedSongsContext);
};

export const LikedSongsProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [error, setError] = useState('');
  const { username,loggedIn } = useLoginContext();

  useEffect(() => {
    if (username!==null && loggedIn) {
      fetchLikedSongs(username);
    }
  }, [username]);

  const fetchLikedSongs = async (username) => {
    try {
      const response = await BackEndService.get(`/liked-songs/${username}?page=1`);
      const data = response?.data;
      setLikedSongs(data?.songs);
      setError('');
    } catch (error) {
      console.error('Error fetching liked songs:', error);
      setError('Error fetching liked songs:', error);
    }
  };

  const contextValue = {
    likedSongs: likedSongs,
    error: error,
  };

  return (
    <LikedSongsContext.Provider value={contextValue}>
      {children}
    </LikedSongsContext.Provider>
  );
};
