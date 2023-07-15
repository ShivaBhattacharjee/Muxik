import axios from "axios";
import EndPoints from "./EndPoints";

const SAVAN_BASE_URL = "https://saavn.me";

const api = axios.create({ baseURL: SAVAN_BASE_URL });

class SaavanService {
  static getHomeData() {
    const languages = ["hindi", "english", "Bhojpuri"].join(",");
    return api.get(EndPoints.modules(languages));
  }

  static getSongs(id) {
    return api.get(EndPoints.songs(id));
  }

  static getAlbums(id) {
    return api.get(EndPoints.albums(id));
  }

  static getPlaylists(id) {
    return api.get(EndPoints.playlists(id));
  }

  static getArtists(id) {
    return api.get(EndPoints.artists(id));
  }

  static getArtistsSongs(id, ...pages) {
    const get = (page) => api.get(EndPoints.artistsSongs(id, page));
    return Promise.all(pages.map(get));
  }

  static getArtistsAlbums(id) {
    return api.get(EndPoints.artistsAlbums(id, 1));
  }
}

export default SaavanService;
