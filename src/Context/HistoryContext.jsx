// HistoryContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLoginContext } from '../Context/LoginContext';
import BackEndService from '../services/BackEndService';

const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
  const { loggedIn, username } = useLoginContext();
  const [songHistory, setSongHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



  const fetchSongHistory = async (username) => {
    try {
      setLoading(true);
      setError('');

      const response = await BackEndService.get(`/song-history/${username}`);
      setLoading(false);
      setSongHistory(response.data);
    } catch (error) {
      setLoading(false);
      setError('Error fetching song history.');
    }
  };

  const addSongToHistory = async (songId, songName, banner) => {
    try {
        await BackEndService.post("/add-song-history", {
        username: username,
        songId: songId,
        songName: songName,
        banner: banner,
      });
      // fetchSongHistory(username)
    } catch (error) {
      console.error("Error adding song to history:", error);
    }
  };


  return (
    <HistoryContext.Provider value={{ songHistory, loading, error, addSongToHistory,fetchSongHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

const useHistoryContext = () => useContext(HistoryContext);

export { HistoryProvider, useHistoryContext };
