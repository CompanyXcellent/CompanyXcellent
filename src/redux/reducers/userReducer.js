import axios from "axios";

const initialState = {
  user: {},
  loggedIn: false,
  userInfo: {},
  userSubscriptions: []
};

const GET_USER = 'GET_USER';
const LOGOUT = 'LOGOUT';
const GET_USER_INFO = 'GET_USER_INFO';
const GET_USER_SUBSCRIPTIONS = 'GET_USER_SUBSCRIPTIONS';

export const getUserSubscriptions = (id) => {
  const userSubscriptions = axios.get(`/api/profile/${id}/subscriptions`).then(res => res.data);
  console.log(userSubscriptions);

  return {
    type: GET_USER_SUBSCRIPTIONS,
    payload: userSubscriptions
  }
}

export const getUserInfo = (id) => {
  const userInfo = axios.get(`/api/profile/${id}`).then(res => res.data)
  return{
    type: GET_USER_INFO,
    payload: userInfo
  }
}

export const getUser = () => {
    const user = axios.get('/api/getUser').then(res => res.data)
    return {
        type: GET_USER,
        payload: user
    }
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: null
  }
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER + "_FULFILLED":
      return {...state ,user: payload, loggedIn: true};
    case LOGOUT:
      return {...state, user: {loggedIn: false}}
    case GET_USER_INFO + "_FULFILLED":
      return{...state, userInfo: payload}
    case GET_USER_SUBSCRIPTIONS + "_FULFILLED":
      return{...state, userSubscriptions: payload}
    default:
      return state;
  }
}
