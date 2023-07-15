import { GET_SINGLE_ALBUM, _onError, _onSuccess } from "../../Actions";
import { SaavanService } from "../../services";
import useHooksReducer from "./useHooksReducer";

const initialState = {
  data: [],
  loading: false,
};

const useCurrentAlbumReducer = () => {
  const [state, dispatch] = useHooksReducer(GET_SINGLE_ALBUM, initialState);

  const singleAlbums = async (id) => {
    dispatch({ type: GET_SINGLE_ALBUM });
    try {
      const response = await SaavanService.getAlbums(id);
      const result = response.data;

      dispatch({ type: _onSuccess(GET_SINGLE_ALBUM), payload: result });
    } catch (error) {
      dispatch({ type: _onError(GET_SINGLE_ALBUM) });
    }
  };

  return {
    singleAlbums,
    currentAlbum: state.data,
    single_album_loading: state.loading,
  };
};

export default useCurrentAlbumReducer;
