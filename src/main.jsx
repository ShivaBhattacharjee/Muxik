import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MusicProvider } from "./Context/MusicContext";
import { PlayerProvider } from "./Context/PlayerContext";
import { LoginProvider } from "./Context/LoginContext";
import { LikedSongsProvider } from "./Context/LikedSongsContext";
import { HistoryProvider } from "./Context/HistoryContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginProvider>
      <MusicProvider>
        <HistoryProvider>
        <PlayerProvider>
          <LikedSongsProvider>
            <App />
          </LikedSongsProvider>
        </PlayerProvider>
        </HistoryProvider>
      </MusicProvider>
    </LoginProvider>
  </React.StrictMode>
);
