import { _onError, _onSuccess } from "../Actions";

export default (state, action, type) => {
  switch (action.type) {
    case type:
      return {
        ...state,
        loading: true,
      };
    case _onSuccess(type):
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case _onError(type):
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
