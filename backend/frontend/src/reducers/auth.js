import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    VALIDATE_USER,
    RESET_PASSWORD_SENT,
    RESET_PASSWORD_CHECK_SUCCESS,
    RESET_PASSWORD_SUCCESS,
    CHECK_VALIDATION_SUCCESS,
    CHECK_ACCOUNT_SUCCESS,
    GET_EXTENDED_USER_SUCCESS, CHECK_VALIDATION_FAIL
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    extendedUser: null,
    isValidated: null,
    isRegistered: false,
    resetPassword: false,
    passwordTokenValidated: false,
    passwordChanged: false,
    externalAccount: 'None'
}

export default function(state = initialState, action) {
    switch(action.type){
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                isRegistered: true
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: false,
                isLoading: false,
                isRegistered: true
            };
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isLoading: false,
                isAuthenticated: false,
                user: null,
                isRegistered: false
            };
        case VALIDATE_USER:
            return {
                ...state,
                isValidated: true,
                isAuthenticated: false,
                isLoading: false,
                isRegistered: true
            }
        case RESET_PASSWORD_SENT:
            return {
                ...state,
                resetPassword: true
            }
        case RESET_PASSWORD_CHECK_SUCCESS:
            return {
                ...state,
                passwordTokenValidated:true,
                user: action.payload.user
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                user: action.payload,
                passwordChanged: true
            }
        case CHECK_VALIDATION_SUCCESS:
            return{
                ...state,
                isValidated: true
            }
        case CHECK_VALIDATION_FAIL:
            return{
                ...state,
                isValidated: false
            }
        case CHECK_ACCOUNT_SUCCESS :
            return {
                ...state,
                ...action.payload,
                externalAccount: action.payload,
            }
        case GET_EXTENDED_USER_SUCCESS :
            return {
                ...state,
                extendedUser: action.payload,
            }
        default:
            return state;
    }
}