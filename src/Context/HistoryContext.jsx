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

  useEffect(() => {
    if (loggedIn && username) {
      setLoading(true);
      setError('');

      BackEndService.get(`/song-history/${username}`)
        .then((response) => {
          setLoading(false);
          setSongHistory(response.data);
        })
        .catch((error) => {
          setLoading(false);
          setError('Error fetching song history.');
        });
    }
  }, [loggedIn, username]);

  return (
    <HistoryContext.Provider value={{ songHistory, loading, error }}>
      {children}
    </HistoryContext.Provider>
  );
};

const useHistoryContext = () => useContext(HistoryContext);

export { HistoryProvider, useHistoryContext };
