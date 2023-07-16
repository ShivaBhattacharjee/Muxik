import React, { useContext, useEffect, useReducer, useState } from "react";
import reducer from "../Reducers/MusicReducer";
import {
  ALERT_SHOW,
  GET_ARTIST_ALBUMS_BEGIN,
  GET_ARTIST_ALBUMS_SUCESS,
  GET_ARTIST_ALBUMS_ERROR,
} from "../Actions";
import {
  useArtistsSongReducer,
  useHomeReducer,
  useSingleAlbumReducer,
  useSingleArtistReducer,
  useSinglePlaylistReducer,
} from "../Reducers";
import { SaavanService } from "../services";

const initialState = {
  homeData_loading: false,
  single_album_loading: false,
  single_artist_loading: false,
  single_artist_songs_loading: false,
  single_artist_albums_loading: false,
  albums: [],
  playlists: [],
  charts: [],
  trendingAlbums: [],
  trendingSongs: [],
  currentAlbum: [],
  currentPlaylists: [],
  alert_show: false,
  single_artist_details: [],
  single_artist_songs: [],
  single_artist_albums: [],
};

const MusicContext = React.createContext();

export const MusicProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const homeState = useHomeReducer();
  const singleAlbum = useSingleAlbumReducer();
  const singlePlaylist = useSinglePlaylistReducer();
  const singleArtist = useSingleArtistReducer();
  const artistsSongs = useArtistsSongReducer();

  const ArtistAlbums = async (id) => {
    dispatch({ type: GET_ARTIST_ALBUMS_BEGIN });
    try {
      const res = await SaavanService.getArtistsAlbums(id);
      const data = res.data.data.results;
      dispatch({ type: GET_ARTIST_ALBUMS_SUCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ARTIST_ALBUMS_ERROR });
    }
  };

  const HandleAlert = () => {
    dispatch({ type: ALERT_SHOW });
  };

  return (
    <MusicContext.Provider
      value={{
        ...state,
        HandleAlert,
        ArtistAlbums,
        ...homeState,
        ...singleAlbum,
        ...singlePlaylist,
        ...singleArtist,
        ...artistsSongs,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusicContext = () => {
  return useContext(MusicContext);
};
