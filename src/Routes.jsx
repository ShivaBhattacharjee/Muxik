import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  Home,
  SingleAlbum,
  SearchResult,
  SinglePlayLists,
  ViewAllSongList,
  ViewAllAlbums,
  Artist,
  TopArtist,
  PageNotFound,
  Login,
  SignUp,
  ForgotPassword,
  LikedSongs,
  History,
  UserProfile,
  Faq
} from "./Page";
import {
  HindiPlaylist,
  BhojpuriPlaylist,
  EnglishPlaylists,
} from "./components";



const AnimateRoutes = () => {
  const location = useLocation();

  return (
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/album/:id" element={<SingleAlbum />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/search/album/:id" element={<SingleAlbum />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/playlists/:id" element={<SinglePlayLists />} />
        <Route path="search/playlists/:id" element={<SinglePlayLists />} />
        <Route path="search/songs/:keyword" element={<ViewAllSongList />} />
        <Route path="search/albums/:keyword" element={<ViewAllAlbums />} />
        <Route path="/topplaylists/Hindi" element={<HindiPlaylist />} />
        <Route path="/topplaylists/Bhojpuri" element={<BhojpuriPlaylist />} />
        <Route path="/topplaylists/English" element={<EnglishPlaylists />} />
        <Route path="/topartist" element={<TopArtist />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/liked-songs" element={<LikedSongs/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/faq" element={<Faq/>}/>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
  );
};

export default AnimateRoutes;
