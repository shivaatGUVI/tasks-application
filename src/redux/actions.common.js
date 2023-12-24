import axios from "axios";
import { BACKENDURL, ERROR, LOADING, DONE } from "./actionTypes.common";

export const isLoading = () => {
  return { type: LOADING };
};

export const isError = (payload) => {
  return { type: ERROR, payload };
};

export const CALLCOMPLETEDTASKS = async (dispatch, token) => {
  dispatch(isLoading());
  try {
    const request = await axios.get(`${BACKENDURL}complete/all`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: DONE });
    return request;
  } catch (err) {
    dispatch(isError(err.message));
    return err.response;
  }
};
