import axios from "axios";

const initialState = {
  user: {},
  loggedIn: false
};

const GET_USER = 'GET_USER'
const LOGOUT = 'LOGOUT'

export const getUser = () => {
    console.log('hit userReducer')
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
    default:
      return state;
  }
}