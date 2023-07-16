import {
  ALERT_SHOW,
  GET_ARTIST_ALBUMS_BEGIN,
  GET_ARTIST_ALBUMS_SUCESS,
} from "../Actions";

const Music_reducer = (state, action) => {
  if (action.type === GET_ARTIST_ALBUMS_BEGIN) {
    return {
      ...state,
      single_artist_albums_loading: true,
    };
  }

  if (action.type === GET_ARTIST_ALBUMS_SUCESS) {
    let data = action.payload;
    return {
      ...state,
      single_artist_albums: data,
      single_artist_albums_loading: false,
    };
  }

  if (action.type === ALERT_SHOW) {
    return { ...state, alert_show: false };
  }

  throw new Error(`No Matching "${action.type}" -action type`);
};

export default Music_reducer;
