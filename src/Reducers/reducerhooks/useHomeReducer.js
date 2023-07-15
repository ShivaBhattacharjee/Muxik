import { useEffect, useReducer } from "react";
import DefaultReducer from "../DefaultReducer";
import { GET_HOME_DATA, _onError, _onSuccess } from "../../Actions";
import { SaavanService } from "../../services";

const homeReducer = (state, action) => {
  return DefaultReducer(state, action, GET_HOME_DATA);
};

const initialState = {
  albums: [],
  playlists: [],
  charts: [],
  trendingAlbums: [],
  trendingSongs: [],
  loading: false,
};

const useHomeReducer = () => {
  const [state, dispatch] = useReducer(homeReducer, initialState);

  const homePageMusic = async () => {
    dispatch({ type: GET_HOME_DATA });
    try {
      const response = await SaavanService.getHomeData();
      let result = response.data.data;
      dispatch({
        type: _onSuccess(GET_HOME_DATA),
        payload: {
          ...result,
          trendingAlbums: result.trending.albums,
          trendingSongs: result.trending.songs,
        },
      });
    } catch (error) {
      dispatch({ type: _onError(GET_HOME_DATA) });
    }
  };

  useEffect(() => {
    homePageMusic();
  }, []);

  return {
    ...state,
    homeDataLoading: state.loading,
  };
};

export default useHomeReducer;
