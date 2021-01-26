import { combineReducers } from 'redux';
import students from './students';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import schools from './schools';
import tests from './tests';
import roles from './roles'


export default combineReducers({
    students,
    errors,
    messages,
    auth,
    schools,
    tests,
    roles
});