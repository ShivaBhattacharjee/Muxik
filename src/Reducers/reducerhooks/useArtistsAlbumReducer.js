import { GET_ARTIST_ALBUMS, _onError, _onSuccess } from "../../Actions";
import { SaavanService } from "../../services";
import useHooksReducer from "./useHooksReducer";

const initialState = {
  data: [],
  loading: false,
};

const useArtistsAlbumReducer = () => {
  const [state, dispatch] = useHooksReducer(GET_ARTIST_ALBUMS, initialState);

  const getArtistAlbums = async (id) => {
    dispatch({ type: GET_ARTIST_ALBUMS });
    try {
      const res = await SaavanService.getArtistsAlbums(id);
      const data = res.data.data.results;
      dispatch({ type: _onSuccess(GET_ARTIST_ALBUMS), payload: { data } });
    } catch (error) {
      dispatch({ type: _onError(GET_ARTIST_ALBUMS), payload: error });
    }
  };

  return {
    getArtistAlbums,
    single_artist_albums: state.data,
    single_artist_albums_loading: state.loading,
  };
};

export default useArtistsAlbumReducer;
