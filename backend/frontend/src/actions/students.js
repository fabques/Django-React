import axios from 'axios';
import { GET_STUDENTS, DELETE_STUDENT, ADD_STUDENT } from './types';
import { createMessage, returnErrors } from './messages'
import { tokenConfig } from './auth'


// GET STUDENTS
export const getStudents =  id => async (dispatch, getState) => {

    await axios.get('api/students',{params: {id: id}})
        .then(res => {
            dispatch({
            type: GET_STUDENTS,
            payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors( err.response.data, err.response.status)));
};


// DETELE STUDENT
export const deleteStudent = id => (dispatch, getState) => {
    axios.delete(`api/students/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deleteStudent: "Estudiante eliminado" }));
            dispatch({
            type: DELETE_STUDENT,
            payload: id
            });
        })
        .catch(err => console.log(err));
};

// ADD STUDENT
export const addStudent = (student, id) => (dispatch, getState) => {

    const body = JSON.stringify({ student })
    axios
        .post('api/students', body, tokenConfig(getState))
            .then(res => {
                dispatch(createMessage({ addStudent:"Estudiante añadido"}));
                dispatch({
                type: ADD_STUDENT,
                payload: res.data
                });
                dispatch(getStudents(id))
            })
        .catch(err => dispatch(returnErrors( err.response.data, err.response.status)));
};