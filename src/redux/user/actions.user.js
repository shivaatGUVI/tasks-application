import axios from "axios";
import { isError, isLoading } from "../actions.common";
import { USER, USERBACKENDURL } from "./actionTypes.user";

const fetchUser = (payload) => {
  return { type: USER, payload };
};

export const GETUSERCALL = async (dispatch, route, payload) => {
  dispatch(isLoading());
  try {
    const request = await axios.post(`${USERBACKENDURL}/${route}`, payload);
    dispatch(fetchUser(request.data));
    return request;
  } catch (err) {
    dispatch(isError(err.message));
    return err.response;
  }
};
