import axios from 'axios';
import { returnErrors } from './messages';
import 'babel-polyfill';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    VALIDATE_USER,
    RESET_PASSWORD_SENT,
    RESET_PASSWORD_CHECK_SUCCESS,
    RESET_PASSWORD_SUCCESS,
    CHECK_VALIDATION_SUCCESS,
    CHECK_ACCOUNT_SUCCESS, GET_EXTENDED_USER_SUCCESS, CHECK_VALIDATION_FAIL
} from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });

    console.log('GetState', getState)

    axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        });
    });
};


// LOGIN USER
export const login = (username, password) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // Request Body
    const body = JSON.stringify({ username, password });


    axios.post('/api/auth/login', body,  config)
    .then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: LOGIN_FAIL
        });
    });
};

// REGISTER USER
export const register = ({ username, password, email, isValidated, val_token, external_account, role }) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request Body
    const request = JSON.stringify({"user":{"username":username, "password":password, "email": email},
        "isValidated":isValidated,
        "val_token":val_token,
        "external_account": external_account,
        "role": role
    })

    axios.post('/api/auth/register', request,  config)
    .then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: REGISTER_FAIL
        });
    });
};


// LOGOUT USER
export const logout = () => (dispatch, getState) => {

    axios.post('/api/auth/logout/', null, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: LOGOUT_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // If token, add to headers config
    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
}

// Validate User
export const validateUser = (val_token) => dispatch => {

    axios.get('/api/auth/validate', {params: {val_token: val_token}})
    .then(res => {
        dispatch({
            type: VALIDATE_USER,
            payload: res.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const forgotPassword = (email) => dispatch => {

    axios.get('/api/auth/forgot-password', {params: {email: email}})
        .then(res =>{
            dispatch ({
                type: RESET_PASSWORD_SENT,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
    })
}

export const checkPasswordToken = (psw_token) => async (dispatch) =>{

    axios.get('api/auth/check-password-token', {params: {psw_token: psw_token}})
        .then(res=> {
            dispatch({
                type: RESET_PASSWORD_CHECK_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
    })
}

export const resetPassword = (new_password, user) => dispatch => {
    axios.post('/api/auth/reset-password', {password: new_password, user: user})
        .then(res =>{
            dispatch ({
                type: RESET_PASSWORD_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
    })
}

export const checkValidation = (username) => async dispatch => {

    axios.get('api/auth/check-validation', {params: {username: username}})
        .then(res => {
            dispatch ({
                type: CHECK_VALIDATION_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type: CHECK_VALIDATION_FAIL});
    })
}

export const checkAccount = (username) => async dispatch => {

    await axios.get('api/auth/check-account', {params: {username: username}})
        .then(res => {
            dispatch ({
                type: CHECK_ACCOUNT_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
    })
}

export const getExtendedUser = (id) => async dispatch => {

    axios.get('api/auth/register', {params: {id: id}})
        .then(res => {
            dispatch ({
                type: GET_EXTENDED_USER_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
    })
}
