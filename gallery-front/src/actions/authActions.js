import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      history.push("/login");
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login -get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Once we get response, save to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //set  token to Authorization header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//log out user
export const logoutUser = () => dispatch => {
  //remove token from local Storage
  localStorage.removeItem("jwtToken");
  //Remove authorization header from future requests
  setAuthToken(false);
  //set the current user to empty object so that isAuthenticated will be false
  dispatch(setCurrentUser({}));
};
