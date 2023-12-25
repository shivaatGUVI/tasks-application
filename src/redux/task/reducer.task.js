import { RESET } from "../actionTypes.common";
import { TASKS } from "./actionTypes.task";

const initialState = {
  tasks: [],
};

export const taskReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TASKS: {
      return { ...state, tasks: payload.tasks };
    }
    case RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
