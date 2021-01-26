import axios from 'axios';
import { ROLES_LOADED } from './types';
import { createMessage, returnErrors } from './messages'
import { tokenConfig } from './auth'


export const getRoles = () => (dispatch, getState) => {
    axios.get('/api/roles', tokenConfig(getState)) //tokenConfig to access private routes
        .then(res => {
            dispatch({
            type: ROLES_LOADED,
            payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors( err.response.data, err.response.status)));
};