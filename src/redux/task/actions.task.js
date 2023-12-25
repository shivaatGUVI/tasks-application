import axios from "axios";
import { DONEFUNCTION, isLoading } from "../actions.common";
import { TASKS, TASKBACKENDURL } from "./actionTypes.task";

export const fetchTasks = (payload) => {
  return { type: TASKS, payload };
};

export const GETTASKSCALL = async (dispatch, token) => {
  dispatch(isLoading());
  try {
    const request = await axios.get(`${TASKBACKENDURL}/all`, {
      headers: {
        authorization: token,
      },
    });
    dispatch(fetchTasks(request.data));
    DONEFUNCTION(dispatch);
    return request;
  } catch (err) {
    return err.response;
  }
};

export const ADDTASKCALL = async (dispatch, token, payload) => {
  dispatch(isLoading());
  try {
    const request = await axios.post(
      `${TASKBACKENDURL}/add`,
      { ...payload, createdOn: new Date() },
      {
        headers: {
          authorization: token,
        },
      }
    );
    GETTASKSCALL(dispatch, token);
    DONEFUNCTION(dispatch);
    return request;
  } catch (err) {
    return err.response;
  }
};

export const UPDATETASKCALL = async (dispatch, token, id, payload) => {
  dispatch(isLoading());
  try {
    const request = await axios.patch(`${TASKBACKENDURL}/edit/${id}`, payload, {
      headers: {
        authorization: token,
      },
    });
    GETTASKSCALL(dispatch, token);
    DONEFUNCTION(dispatch);
    return request;
  } catch (err) {
    return err.response;
  }
};

export const DELETETASKCALL = async (dispatch, token, id) => {
  dispatch(isLoading());
  try {
    const request = await axios.delete(`${TASKBACKENDURL}/delete/${id}`, {
      headers: {
        authorization: token,
      },
    });
    GETTASKSCALL(dispatch, token);
    DONEFUNCTION(dispatch);
    return request;
  } catch (err) {
    return err.response;
  }
};

export const COMPLETETASKCALL = async (dispatch, token, element) => {
  dispatch(isLoading());
  try {
    const request = await axios.post(
      `${TASKBACKENDURL}/complete/${element._id}`,
      element,
      {
        headers: {
          authorization: token,
        },
      }
    );
    GETTASKSCALL(dispatch, token);
    DONEFUNCTION(dispatch);
    return request;
  } catch (err) {
    return err.response;
  }
};

export const NOTIFYTASKCALL = async (dispatch, token, element) => {
  dispatch(isLoading());
  console.log(element, element._id);
  try {
    const request = await axios.post(
      `${TASKBACKENDURL}/reminder/${element._id}`,
      element,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return request;
  } catch (err) {
    return err.response;
  }
};

