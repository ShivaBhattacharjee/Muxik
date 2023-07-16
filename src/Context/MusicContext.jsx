import React, { useContext, useReducer } from "react";
import reducer from "../Reducers/MusicReducer";
import { ALERT_SHOW } from "../Actions";
import {
  useArtistsAlbumReducer,
  useArtistsSongReducer,
  useHomeReducer,
  useSingleAlbumReducer,
  useSingleArtistReducer,
  useSinglePlaylistReducer,
} from "../Reducers";

const initialState = {
  alert_show: false,
};

const MusicContext = React.createContext();

export const MusicProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const homeState = useHomeReducer();
  const singleAlbum = useSingleAlbumReducer();
  const singlePlaylist = useSinglePlaylistReducer();
  const singleArtist = useSingleArtistReducer();
  const artistsSongs = useArtistsSongReducer();
  const artistAlbums = useArtistsAlbumReducer();

  const HandleAlert = () => {
    dispatch({ type: ALERT_SHOW });
  };

  return (
    <MusicContext.Provider
      value={{
        ...state,
        HandleAlert,
        ...homeState,
        ...singleAlbum,
        ...singlePlaylist,
        ...singleArtist,
        ...artistsSongs,
        ...artistAlbums,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusicContext = () => {
  return useContext(MusicContext);
};
