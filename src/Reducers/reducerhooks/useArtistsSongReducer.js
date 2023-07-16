import { GET_ARTIST_SONGS, _onError, _onSuccess } from "../../Actions";
import { SaavanService } from "../../services";
import useHooksReducer from "./useHooksReducer";

const initialState = {
  data: [],
  loading: false,
};

const useArtistsSongReducer = () => {
  const [state, dispatch] = useHooksReducer(GET_ARTIST_SONGS, initialState);

  const getArtistSongs = async (id) => {
    dispatch({ type: GET_ARTIST_SONGS });
    try {
      const [res, res2] = await SaavanService.getArtistsSongs(id, 1, 2);
      const data1 = res.data.data.results;
      const data2 = res2.data.data.results;
      const data = [...data1, ...data2];
      dispatch({ type: _onSuccess(GET_ARTIST_SONGS), payload: { data } });
    } catch (error) {
      dispatch({ type: _onError(GET_ARTIST_SONGS), payload: error });
    }
  };

  return {
    getArtistSongs,
    single_artist_songs: state.data,
    single_artist_songs_loading: state.loading,
  };
};

export default useArtistsSongReducer;
