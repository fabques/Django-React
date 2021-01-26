import {
    CODE_CHECKED,
    CODE_FAILED
} from '../actions/types'

const initialState = {
    testChecked: null,
    test_student: {
        'id': 0,
        'name': 'None',
        'surname': 'None',
        'school': 0,
        'grade': 0,
        'tutor': 0}
}

export default function(state = initialState, action) {
    switch(action.type){
        case CODE_CHECKED:
            console.log('Action payload', action.payload)
            return {
                ...state,
                testChecked: true,
                test_student: action.payload
            };
        case CODE_FAILED:
            return {
                ...state,
                testChecked: false
            };
        default:
            return state;
    }
}