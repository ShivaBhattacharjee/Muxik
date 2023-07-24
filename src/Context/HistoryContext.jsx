import { createContext, useContext, useState, useEffect } from 'react';
import BackEndService from '../services/BackEndService'; // Update the path accordingly
import { useLoginContext } from './LoginContext';

const HistoryContext = createContext();

export const useHistoryContext = () => useContext(HistoryContext);

export const HistoryProvider = ({ children }) => {
  const { loggedIn, username } = useLoginContext();
  const [songHistory, setSongHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (loggedIn && username) {
      fetchSongHistory();
    }
  }, [loggedIn, username]);

  const fetchSongHistory = async () => {
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
      const response = await BackEndService.post("/add-song-history", {
        username,
        songId,
        songName,
        banner,
      });
      console.log("Song added to history:", response.data);
    } catch (error) {
      console.error("Error adding song to history:", error);
      throw new Error("Failed to add song to history" + error);
    }
  };

  const contextValue = {
    songHistory: songHistory,
    loading: loading,
    error: error,
    addSongToHistory: addSongToHistory,
  };

  return (
    <HistoryContext.Provider value={contextValue}>
      {children}
    </HistoryContext.Provider>
  );
};
