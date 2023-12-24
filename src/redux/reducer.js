import { ERROR, LOADING, DONE } from "./actionTypes.common";

const initialState = {
  isLoading: false,
  isError: { state: false, error: "" },
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING: {
      return { ...state, isLoading: !state.isLoading };
    }
    case ERROR: {
      return {
        ...state,
        isLoading: !state.isLoading,
        isError: { state: true, error: payload },
      };
    }
    case DONE: {
      return { ...state, login: !state.isLoading };
    }
    default: {
      return state;
    }
  }
};
