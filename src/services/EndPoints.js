const EndPoints = {
  modules: (language) => `/modules/?language=${language}`,
  songs: (id) => `/songs?id=${id}`,
  albums: (id) => `/albums?id=${id}`,
  playlists: (id) => `/playlists?id=${id}`,
  artists: (id) => `/artists?id=${id}`,
  artistsSongs: (id, page) => `/artists/${id}/songs?page=${page}`,
  artistsAlbums: (id, page) => `/artists/${id}/albums?page=${page}`,
  search: "/search",
  all: (query) => `/all?query=${query}`,
  searchSongs: (query, page) => `/songs?page=${page}&query=${query}`,
  searchAlbums: (query, page) => `/albums?page=${page}&query=${query}`,
  login : "/login"
};

export default EndPoints;
