import { USER, LOGOUT } from "./actionTypes.user";

const initialState = {
  token: "",
  user: {},
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER: {
      return { ...state, token: payload.token, user: payload.user };
    }
    case LOGOUT: {
      return state;
    }
    default: {
      return state;
    }
  }
};
