import axios from 'axios'

const initialState = {
    customer: {},
    loading: false,
    error: false,
    errorMessage: ''
}

const CHECK_CUS = "CHECK_CUS"
const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const REGISTER = "REGISTER"
const CLEAR_REDUCER = "CLEAR_REDUCER"
const DELETE_ACCOUNT = "DELETE_ACCOUNT"
const EDIT_ACCOUNT = "EDIT_ACCOUNT"

export function clearReducer() {

    let action = {
        type: CLEAR_REDUCER
    }

    return action
}

export function checkCus() {
    let action = {
        type: CHECK_CUS,
        payload: axios.get('/api/check')
    }

    return action
}

export function register(username, email, password) {
    let action = {
        type: REGISTER,
        payload: axios.post(`/api/auth/register`, {username, email, password})
    }

    return action
}

export function login(username, password) {

    let action = {
        type: LOGIN,
        payload: axios.post(`/api/auth/login`, {username, password})
    }

    return action
}

export function logout() {
    let action = {
        type: LOGOUT,
        payload: axios.post('/api/auth/logout')
    }    

    return action
}


export function editAccount() {
    let action = {
        type: EDIT_ACCOUNT,
        payload: axios.post('/api/auth/edit')
    }    
    
    return action
}

export function deleteAccount() {
    let action = {
        type: DELETE_ACCOUNT,
        payload: axios.post('/api/auth/delete')
    }    

    return action
}

export default function cusReducer(state = initialState, action) {
    switch(action.type) {
        case CHECK_CUS + '_PENDING':
            return {...state, loading: true, error: false}
        case CHECK_CUS + '_FULFILLED':
            return {...state, loading: false, customer: action.payload.data}
        case CHECK_CUS + '_REJECTED':
            console.log('CHECK_USER REJECTED')
            return {...state, loading: false}
        case LOGIN + '_PENDING':
            return {...state, loading: true, error: false}
        case LOGIN + '_FULFILLED':
            return {...state, loading: false, customer: action.payload.data}
        case LOGIN + '_REJECTED':
            return {...state, loading: false, error: true, errorMessage: action.payload.response.data}
        case LOGOUT + '_PENDING':
            return {...state, loading: true, error: false}
        case LOGOUT + '_FULFILLED':
            return {...state, ...initialState}
        case LOGOUT + '_REJECTED':
            return {...state, loading: false, error: true}
        case REGISTER + '_PENDING':
            return {...state, loading: true, error: false}
        case REGISTER + '_FULFILLED':
            return {...state, loading: false, customer: action.payload.data}
        case REGISTER + '_REJECTED':
            return {...state, loading: false, error: true, errorMessage: action.payload.response.data}
        case EDIT_ACCOUNT + '_PENDING':
            return {...state, loading: true, error: false}
        case EDIT_ACCOUNT + '_FULFILLED':
            return {...state, loading: false, customer: action.payload.data}
        case EDIT_ACCOUNT + '_REJECTED':
            return {...state, loading: false, error: true, errorMessage: action.payload.response.data}
        case DELETE_ACCOUNT + '_PENDING':
            return {...state, loading: true,error: false}
        case DELETE_ACCOUNT + '_FULFILLED':
            return {...state, loading: false,customer: {}}
        case DELETE_ACCOUNT + '_REJECTED':
            return {...state, loading: false,error: true, errorMessage: action.payload.response.data}
        case CLEAR_REDUCER:
            return {...state, ...initialState}
        default:
            return state;
    }
}