import {GET_STUDENTS_ADMIN} from '../actions/types'

const initialState = {
    students : null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_STUDENTS_ADMIN:
            return {
                ...state,
                students: action.payload
            }
        default:
            return state
    }
}