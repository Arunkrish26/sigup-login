import axios from "axios";
import { getUserData } from "./Storage";

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";

// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

const API_KEY = "AIzaSyABLwWVY6x2q8-wdqtIZJZieXycw4R92AI";
const REGISTER_URL = `/accounts:signUp?key=${API_KEY}`;
const LOGIN_URL = `/accounts:signInWithPassword?key=${API_KEY}`;
const USER_DETAILS_URL = `/accounts:lookup?key=${API_KEY}`;
const DELETE_ACCOUNT_URL = `/accounts:delete?key=${API_KEY}`;
const SEND_PAASWORD_RESET_URL = `/accounts:sendOobCode?key=${API_KEY}`;
export const RegisterApi = (inputs) => {
  let data = {
    displayName: inputs.name,
    email: inputs.email,
    password: inputs.password,
  };
  return axios.post(REGISTER_URL, data);
};

export const loginApi = (inputs) => {
  let data = {
    email: inputs.email,
    password: inputs.password,
  };
  return axios.post(LOGIN_URL, data);
};

export const UserDetailsApi = () => {
  let data = { idToken: getUserData() };
  return axios.post(USER_DETAILS_URL, data);
};

export const DeleteAccApi = () => {
  let data = { idToken: getUserData() };
  return axios.post(DELETE_ACCOUNT_URL, data);
};

export const resetPassword = (inputs) => {
  let data = { requestType: "PASSWORD_RESET", email: inputs.email };
  return axios.post(SEND_PAASWORD_RESET_URL, data);
};
