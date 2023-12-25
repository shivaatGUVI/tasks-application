import axios from "axios";
import { BACKENDURL, LOADING, DONE, RESET } from "./actionTypes.common";

export const isLoading = () => {
  return { type: LOADING };
};

export const LoginError = "You are logged out. Please login again";
export const ServerError = "Server: Please revisit after sometime";

export const DONEFUNCTION = (dispatch) => {
  dispatch({ type: DONE });
};

export const CALLCOMPLETEDTASKS = async (dispatch, token) => {
  dispatch(isLoading());
  try {
    const request = await axios.get(`${BACKENDURL}complete/all`, {
      headers: {
        authorization: token,
      },
    });
    DONEFUNCTION(dispatch);
    return request;
  } catch (err) {
    return err.response;
  }
};

export const RESPONSEFUNCTION = (res) => {
  if (!res) {
    throw new Error(ServerError);
  }

  if (res.status === 500) {
    throw new Error(LoginError);
  }

  if (res.status !== 200) {
    throw new Error(res.data.error);
  }
};

export const ERRORFUNCTION = (dispatch, err, navigate) => {
  if (err.message === LoginError || err.message === ServerError) {
    setTimeout(() => {
      dispatch({ type: RESET });
      navigate("/login");
    }, 1500);
  } else {
    dispatch({ type: DONE });
  }
};
