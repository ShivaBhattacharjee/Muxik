import { GET_ARTIST_DETAILS, _onError, _onSuccess } from "../../Actions";
import { SaavanService } from "../../services";
import useHooksReducer from "./useHooksReducer";

const initialState = {
  data: [],
  loading: false,
};

const useSingleArtistReducer = () => {
  const [state, dispatch] = useHooksReducer(GET_ARTIST_DETAILS, initialState);

  const getSingleArtist = async (id) => {
    dispatch({ type: GET_ARTIST_DETAILS });
    try {
      const response = await SaavanService.getArtists(id);
      const result = response.data;
      dispatch({ type: _onSuccess(GET_ARTIST_DETAILS), payload: result });
    } catch (error) {
      dispatch({ type: _onError(GET_ARTIST_DETAILS), payload: error });
    }
  };

  return {
    getSingleArtist,
    single_artist_details: state.data,
    single_artist_loading: state.loading,
  };
};

export default useSingleArtistReducer;
