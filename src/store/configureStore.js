import {createStore, combineReducers, compose, applyMiddleware} from 'redux';

import placesReducer from './reducers/places';
import uiReducer from "./reducers/ui";
import authReducer from "./reducers/auth";
import attendanceReducer from "./reducers/attendance";
import reviewReducer from "./reducers/reviews";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
    places: placesReducer,
    ui: uiReducer,
    auth: authReducer,
    attendance: attendanceReducer,
    reviews: reviewReducer
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
