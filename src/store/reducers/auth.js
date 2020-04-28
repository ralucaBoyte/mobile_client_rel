import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "../actions/actionTypes";

const initialState = {
    access_token: null,
    refresh_token: null
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
        default:
            return state;
    }
};

export default reducer;
