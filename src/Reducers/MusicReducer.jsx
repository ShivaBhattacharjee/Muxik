import { ALERT_SHOW } from "../Actions";

const Music_reducer = (state, action) => {
  if (action.type === ALERT_SHOW) {
    return { ...state, alert_show: false };
  }

  throw new Error(`No Matching "${action.type}" -action type`);
};

export default Music_reducer;
