import {SET_ATTENDANCE_INFO_ID, SHOW_MESSAGE, SAVE_ATTENDANCE_INFO_DATA} from "../actions/actionTypes";
import {GET_ATTENDANCES_FOR_STUDENT} from "../actions/actionTypes";

const initialState = {
    showAlert: false,
    course: '',
    activity: '',
    message: '',
    attendance_info_id: 0,
    attendances_student: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case SHOW_MESSAGE:
            return {
                ...state,
                showAlert: action.showAlert,
                course: action.course,
                activity: action.activity,
                message: action.message
            };
        case GET_ATTENDANCES_FOR_STUDENT:
            return {
                ...state,
                attendances_student: action.attendances_student
            };
        case SET_ATTENDANCE_INFO_ID:
            return{
                ...state,
                attendance_info_id: action.attendance_info_id
            };
        default:
            return state;
    }
};

export default reducer;
