import axios from 'axios';
import {createMessage, returnErrors} from './messages';

import {
    CODE_CHECKED,
    CODE_FAILED
} from './types';


export const checkCode = codeSmartick => (dispatch) => {
    axios.get('/api/check-token-test',{params: {codeSmartick: codeSmartick}})
    .then(res => {
        dispatch({
            type: CODE_CHECKED,
            payload: res.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: CODE_FAILED
        });
    });
};
