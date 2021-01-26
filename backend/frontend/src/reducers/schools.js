import { GET_SCHOOLS, GET_GRADES } from "../actions/types.js";


const initialState = {
    schools: [],
    grades: [],
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_SCHOOLS:
            return {
                schools: action.payload,
                grades: state.grades
            };
        case GET_GRADES:
            return {
                grades: action.payload,
                schools: state.schools
            };
        default:
            return state;
    }

}