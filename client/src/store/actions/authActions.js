import * as Types from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
export const registerUser = (user, history) => dispatch => {
  axios
    .post("/api/users/register", user)
    .then(res => {
      dispatch({ type: Types.USER_ERROR, payload: { errors: {} } });
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: Types.USER_ERROR,
        payload: {
          errors: err.response.data
        }
      });
    });
};

export const loginUser = (user, history) => dispatch => {
  axios
    .post("/api/users/login", user)
    .then(res => {
      //decode out Token
      //Save Our Token to Local Store
      //Set Auth header
      //dispatch Set_Current_User
      let token = res.data.token;
      localStorage.setItem("auth_token", token);
      let decode = jwt_decode(token);

      setAuthToken(token);

      dispatch({
        type: Types.SET_CURRENT_USER,
        payload: {
          user: decode
        }
      });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: Types.USER_ERROR,
        payload: {
          errors: err.response.data
        }
      });
    });
};
export const setUsr = () => dispatch => {
  let token = localStorage.getItem("auth_token");
  let decode = jwt_decode(token);

  axios
    .get(`/api/users/${decode._id}`)
    .then(u => {
      if (u) {
        dispatch({
          type: Types.SET_CURRENT_USER,
          payload: {
            user: u.data
          }
        });
      }
    })
    .catch();
};
export const logoutUser = history => {
  localStorage.removeItem("auth_token");
  history.push("/login");
  return {
    type: Types.SET_CURRENT_USER,
    payload: {
      user: {}
    }
  };
};
export const checkPassUrl = random => dispatch => {
  console.log("Hello " + random);
  axios
    .get(`/api/users/check/${random}`)
    .then(url => {
      dispatch({
        type: Types.CHECK_PASSWORD_RESET_URL,
        payload: {
          notFound: false
        }
      });
    })
    .catch(err => {
      dispatch({
        type: Types.CHECK_PASSWORD_RESET_URL,
        payload: {
          notFound: true
        }
      });
    });
};
export const sentEmail = (email, history) => dispatch => {
  console.log(email);
  axios
    .post("/api/users/resetemail", { email })
    .then(user => {
      dispatch({
        type: Types.SENT_EMAIL,
        payload: {
          message: "Password Reset Link Sent To Your Email!",
          error: {}
        }
      });
      history.push("/passwordresetemail");
    })
    .catch(err => {
      dispatch({
        type: Types.SENT_EMAIL,
        payload: {
          message: "",
          error: err.response.data
        }
      });
    });
};

export const resetPass = (random, password, password2) => dispatch => {
  axios
    .post("/api/users/resetpassword", {
      random,
      password,
      password2
    })
    .then(user => {
      dispatch({
        type: Types.PASSWORD_RESET,
        payload: {
          error: {},
          message: "Password Reset Successfully!"
        }
      });
    })
    .catch(err => {
      dispatch({
        type: Types.PASSWORD_RESET,
        payload: {
          error: err.response.data,
          message: ""
        }
      });
    });
};
