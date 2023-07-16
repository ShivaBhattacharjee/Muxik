import React, { useContext } from "react";
import {
  useArtistsAlbumReducer,
  useArtistsSongReducer,
  useHomeReducer,
  useSingleAlbumReducer,
  useSingleArtistReducer,
  useSinglePlaylistReducer,
} from "../Reducers";

const MusicContext = React.createContext();

export const MusicProvider = ({ children }) => {
  const homeState = useHomeReducer();
  const singleAlbum = useSingleAlbumReducer();
  const singlePlaylist = useSinglePlaylistReducer();
  const singleArtist = useSingleArtistReducer();
  const artistsSongs = useArtistsSongReducer();
  const artistAlbums = useArtistsAlbumReducer();

  return (
    <MusicContext.Provider
      value={{
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
