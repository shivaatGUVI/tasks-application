import axios from "axios";
import { DONEFUNCTION, isLoading } from "../actions.common";
import { LOGOUT, USER, USERBACKENDURL } from "./actionTypes.user";

const fetchUser = (payload) => {
  return { type: USER, payload };
};

export const GETUSERCALL = async (dispatch, route, payload) => {
  dispatch(isLoading());
  try {
    const request = await axios.post(`${USERBACKENDURL}/${route}`, payload);
    dispatch(fetchUser(request.data));
    DONEFUNCTION(dispatch);
    return request;
  } catch (err) {
    return err.response;
  }
};

export const LOGOUTUSER = async (dispatch) => {
  dispatch({ type: LOGOUT });
};
