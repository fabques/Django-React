import axios from 'axios';
import { returnErrors } from './messages';
import {GET_STUDENTS_ADMIN} from "./types";


export const getAdminStudents = () => dispatch => {

     axios.get('/api/admin/students', null)
         .then(res => {
             dispatch({
                 type: GET_STUDENTS_ADMIN,
                 payload: res.data
             });
         })
         .catch(err => {
             dispatch(returnErrors(err.response.data, err.response.status));
         }
         )
}
