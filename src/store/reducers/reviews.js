import {
    ADD_REVIEW_FOR_PROFESSOR,
    GET_ALL_PROFESSORS,
    CHANGED_CURRENT_PROFESSOR,
    GET_ALL_QUESTIONS
} from "../actions/actionTypes";

const initialState = {
    professors: [],
    loadingProfessors: true,
    currentProfessor: '',
    questions: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PROFESSORS:
            return {
                ...state,
                professors: action.professors,
                loadingProfessors: false
            };
        case CHANGED_CURRENT_PROFESSOR:
            return {
                ...state,
                currentProfessor: action.currentProfessor
            };
        case GET_ALL_QUESTIONS:
            return {
                ...state,
                questions: action.questions,
            };
        default:
            return state;
    }
};

export default reducer;
