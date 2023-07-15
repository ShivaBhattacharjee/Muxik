import { useReducer } from "react";
import DefaultReducer from "../DefaultReducer";

const useHooksReducer = (type, inState) =>
  useReducer((state, action) => {
    return DefaultReducer(state, action, type);
  }, inState);

export default useHooksReducer;
