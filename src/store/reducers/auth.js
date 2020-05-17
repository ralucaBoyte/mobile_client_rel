import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN, LOGIN_ERROR, CLOSE_LOGIN_ERROR} from "../actions/actionTypes";

const initialState = {
    access_token: null,
    refresh_token: null,
    errors: {},
    showErrors: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SET_TOKEN:
            return {
                ...state,
                access_token: action.access_token,
                refresh_token: action.refresh_token
            };
        case AUTH_REMOVE_TOKEN:
            return {
                ...state,
                access_token: null,
                refresh_token: null
            };
        case LOGIN_ERROR:
            return {
                ...state,
                errors: action.message,
                showErrors: true
            };
        default:
            return state;
    }
};

export default reducer;
