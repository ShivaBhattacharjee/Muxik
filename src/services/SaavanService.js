import axios from "axios";
import EndPoints from "./EndPoints";

const SAVAN_BASE_URL = "https://saavn.me";

const api = axios.create({ baseURL: SAVAN_BASE_URL });

const search = axios.create({ baseURL: SAVAN_BASE_URL + EndPoints.search });

class SaavanService {
  getHomeData() {
    const languages = ["hindi", "english", "Bhojpuri"].join(",");
    return api.get(EndPoints.modules(languages));
  }

  getSongs(id) {
    return api.get(EndPoints.songs(id));
  }

  getAlbums(id) {
    return api.get(EndPoints.albums(id));
  }

  getPlaylists(id) {
    return api.get(EndPoints.playlists(id));
  }

  getArtists(id) {
    return api.get(EndPoints.artists(id));
  }

  getArtistsSongs(id, ...pages) {
    const get = (page) => api.get(EndPoints.artistsSongs(id, page));
    return Promise.all(pages.map(get));
  }

  getArtistsAlbums(id) {
    return api.get(EndPoints.artistsAlbums(id, 1));
  }

  searchAll(query) {
    return search.get(EndPoints.all(query));
  }

  searchSongs(query, page = 1) {
    return search.get(EndPoints.searchSongs(query, page));
  }

  searchAlbums(query) {
    return search.get(EndPoints.searchAlbums(query, 1));
  }
}

const SaavanInstance = new SaavanService();

export default SaavanInstance;
