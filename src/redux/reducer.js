import { LOADING, DONE, RESET } from "./actionTypes.common";

const initialState = {
  isLoading: false,
};

export const reducer = (state = initialState, { type }) => {
  switch (type) {
    case LOADING: {
      return { ...state, isLoading: !state.isLoading };
    }
    case DONE: {
      return { ...state, isLoading: !state.isLoading };
    }
    case RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
