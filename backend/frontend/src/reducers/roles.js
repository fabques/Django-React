import { ROLES_LOADED } from '../actions/types';

const initialState = {
    roles: []
};

export default function(state = initialState, action) {
    switch(action.type) {
    case ROLES_LOADED:
        return {
          roles: action.payload
        };
    default:
        return state;
    }
}