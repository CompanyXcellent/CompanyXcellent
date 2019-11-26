import axios from 'axios'

const initialState = {
    user: {
        loggedIn: false
    },
    users: []
},

const UPDATE_USER = 'UPDATE_USER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const GET_USERS = 'GET_USERS';

export function getUsers() {
    let users = axios.get('/api/users').then(res => {
        console.log(res)
        return res.data
    })

    return {
        type: GET_USERS,
        payload: users
    }

}
