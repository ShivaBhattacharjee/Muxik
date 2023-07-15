import { useReducer } from "react";
import DefaultReducer from "../DefaultReducer";
import { GET_SINGLE_PLAYLIST, _onError, _onSuccess } from "../../Actions";
import { SaavanService } from "../../services";

const singlePlaylistReducer = (state, action) => {
  return DefaultReducer(state, action, GET_SINGLE_PLAYLIST);
};

const initialState = {
  data: [],
  loading: false,
};

const useSinglePlaylistReducer = () => {
  const [state, dispatch] = useReducer(singlePlaylistReducer, initialState);

  const getSinglePlaylist = async (id) => {
    dispatch({ type: GET_SINGLE_PLAYLIST });
    try {
      const response = await SaavanService.getPlaylists(id);
      const result = response.data;
      dispatch({ type: _onSuccess(GET_SINGLE_PLAYLIST), payload: result });
    } catch (error) {
      dispatch({ type: _onError(GET_SINGLE_PLAYLIST), payload: error });
    }
  };

  return {
    getSinglePlaylist,
    currentPlaylists: state.data,
    single_album_loading: state.loading,
  };
};

export default useSinglePlaylistReducer;
