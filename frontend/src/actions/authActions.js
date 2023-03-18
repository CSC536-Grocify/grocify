import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

const api = axios.create({
  baseURL: process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? 
    process.env.REACT_APP_REMOTE_API_URL : process.env.REACT_APP_LOCAL_API_URL,
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const loginUser = (username, password) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await api.post('/login', { username, password });
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const logoutUser = () => (dispatch) => {
  // TODO (eduong): Implement logout logic here, such as removing the access token from storage
  dispatch(logout());
};
