import { createContext, useContext, useState, useEffect } from 'react';
import BackEndService from '../services/BackEndService'; // Update the path accordingly
import { useLoginContext } from './LoginContext';

const LikedSongsContext = createContext();

export const useLikedSongs = () => {
  return useContext(LikedSongsContext);
};

export const LikedSongsProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading , setLoading] = useState(true)
  const [error, setError] = useState('');
  const { username } = useLoginContext();



  const fetchLikedSongs = async (username) => {
    try {
      const response = await BackEndService.get(`/liked-songs/${username}?page=1`);
      const data = response?.data;
      setLikedSongs(data?.songs);
      setLoading(false)
      setError('');
    } catch (error) {
      console.error('Error fetching liked songs:', error);
      setError('Error fetching liked songs:', error);
    }
  };

  // Function to add a song to the liked songs
  const addSongToLikedSongs = async (songId, songName, banner) => {
    try {
      const response = await BackEndService.post("/add-liked-songs", {
        username,
        songId,
        songName,
        banner,
      });
      const data = response?.data;
      console.log("Song added to liked songs:", data);
      fetchLikedSongs(username);
    } catch (error) {
      console.error("Error adding song to liked songs:", error);
      throw new Error("Failed to add song to liked songs" + error);
    }
  }

  // Function to delete a song from the liked songs
  const deleteLikedSong = async (songId) => {
    try {
      await BackEndService.delete(`/delete-liked-songs/${username}/${songId}`);
      console.log("Song deleted from liked songs:", songId);
      fetchLikedSongs(username);
    } catch (error) {
      console.error("Error deleting song from liked songs:", error);
      throw new Error("Failed to delete song from liked songs" + error);
    }
  }

  const contextValue = {
    fetchLikedSongs : fetchLikedSongs,
    likedSongs: likedSongs,
    error: error,
    addSongToLikedSongs: addSongToLikedSongs,
    deleteLikedSong: deleteLikedSong,
    loading : loading
  };

  return (
    <LikedSongsContext.Provider value={contextValue}>
      {children}
    </LikedSongsContext.Provider>
  );
};
