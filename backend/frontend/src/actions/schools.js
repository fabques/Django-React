import axios from 'axios';
import { GET_SCHOOLS, GET_GRADES } from './types';
import { returnErrors } from './messages'
import { tokenConfig } from './auth'


// GET SCHOOLS
export const getSchools = cod_postal => (dispatch, getState) => {
    axios.get('/api/schools', {params: {codigo_postal:cod_postal}} ) //tokenConfig to access private routes
        .then(res => {
            dispatch({
            type: GET_SCHOOLS,
            payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors( err.response.data, err.response.status)));
};

// GET GRADES
export const getGrades = () => (dispatch, getState) => {
    axios.get('/api/grades', null) //tokenConfig to access private routes
        .then(res => {
            dispatch({
            type: GET_GRADES,
            payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors( err.response.data, err.response.status)));
};