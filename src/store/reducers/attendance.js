import { SHOW_MESSAGE } from "../actions/actionTypes";

const initialState = {
    showAlert: false,
    course: '',
    activity: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MESSAGE:
            return {
                ...state,
                showAlert: action.showAlert,
                course: action.course,
                activity: action.activity
            };
        default:
            return state;
    }
};

export default reducer;
