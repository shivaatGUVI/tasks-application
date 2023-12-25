import { RESET } from "../actionTypes.common";
import { USER, LOGOUT } from "./actionTypes.user";

const initialState = {
  token: localStorage.getItem("token") || "",
  user: {},
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER: {
      localStorage.setItem("token", payload.token);
      return { ...state, token: payload.token, user: payload.user };
    }
    case LOGOUT: {
      localStorage.removeItem("token");
      return initialState;
    }
    default: {
      return state;
    }
  }
};
