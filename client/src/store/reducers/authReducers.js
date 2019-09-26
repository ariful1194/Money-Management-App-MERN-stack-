import * as Types from "../actions/types";

const init = {
  isAuthenticated: false,
  user: {},
  errors: {},
  notfound: true,
  message: ""
};
const authReducers = (state = init, action) => {
  switch (action.type) {
    case Types.SET_CURRENT_USER: {
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: Object.keys(action.payload.user).length !== 0,
        errors: {}
      };
    }
    case Types.USER_ERROR: {
      return {
        ...state,
        errors: action.payload.errors
      };
    }
    case Types.CHECK_PASSWORD_RESET_URL: {
      // console.log("Hello not Found! "+ action.payload.notFound)
      return {
        ...state,
        notfound: action.payload.notFound
      };
    }
    case Types.SENT_EMAIL: {
      return {
        ...state,
        message: action.payload.message,
        errors: action.payload.error
      };
    }
    case Types.PASSWORD_RESET: {
      return {
        ...state,
        message: action.payload.message,
        errors: action.payload.error
      };
    }
    default:
      return state;
  }
};

export default authReducers;
