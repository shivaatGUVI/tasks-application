import axios from "axios";
import { isError, isLoading } from "../actions.common";
import { TASKS, TASKBACKENDURL } from "./actionTypes.task";

export const fetchTasks = (payload) => {
  return { type: TASKS, payload };
};

// const updateTask = (payload) => {
//   return { type: EDITTASK, payload };
// };

// const deleteTask = (payload) => {
//   return { type: DELETETASK, payload };
// };

// const completeTask = (payload) => {
//   return { type: COMPLETETASK, payload };
// };

export const GETTASKSCALL = async (dispatch, token) => {
  dispatch(isLoading());
  try {
    const request = await axios.get(`${TASKBACKENDURL}/all`, {
      headers: {
        authorization: token,
      },
    });
    dispatch(fetchTasks(request.data));
    return request;
  } catch (err) {
    dispatch(isError(err.message));
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
    return request;
  } catch (err) {
    dispatch(isError(err.message));
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
    return request;
  } catch (err) {
    dispatch(isError(err.message));
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
    return request;
  } catch (err) {
    dispatch(isError(err.message));
    return err.response;
  }
};

export const COMPLETETASKCALL = async (dispatch, token, id) => {
  dispatch(isLoading());
  // console.log(token, id);
  try {
    const request = await axios.post(`${TASKBACKENDURL}/complete/${id}`, {
      headers: {
        authorization: token,
      },
    });
    GETTASKSCALL(dispatch, token);
    return request;
  } catch (err) {
    dispatch(isError(err.message));
    return err.response;
  }
};

export const NOTIFYTASKCALL = async (dispatch, token, id) => {
  dispatch(isLoading());
  try {
    const request = await axios.post(`${TASKBACKENDURL}/reminder/${id}`, {
      headers: {
        authorization: token,
      },
    });
    return request;
  } catch (err) {
    dispatch(isError(err.message));
    return err.response;
  }
};

export const SORTBYDEADLINE = (dispatch, tasks) => {
  const sortedArray = tasks.sort((a, b) => {
    if (a.deadline && b.deadline) {
      return new Date(a.deadline) - new Date(b.deadline);
    }
    return a;
  });

  dispatch(fetchTasks({ tasks: sortedArray }));
};
