import { ERRORS } from "./types";

export const error = err => dispatch => {
  dispatch({
    type: ERRORS,
    payload: err
  })
};
