import { legacy_createStore, combineReducers } from "redux";
import { reducer } from "./reducer";
import { taskReducer } from "./task/reducer.task";
import { userReducer } from "./user/reducer.user";

const rootReducer = combineReducers({
  reducer: reducer,
  taskReducer: taskReducer,
  userReducer: userReducer,
});

export const store = legacy_createStore(rootReducer);
