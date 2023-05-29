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
} from "./Page";
import {
  HindiPlaylist,
  BhojpuriPlaylist,
  EnglishPlaylists,
} from "./components";

import { AnimatePresence } from "framer-motion";

const AnimateRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
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
      </Routes>
    </AnimatePresence>
  );
};

export default AnimateRoutes;
