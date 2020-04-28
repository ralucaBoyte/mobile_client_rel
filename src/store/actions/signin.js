
import * as qs from "qs";

import {
    SIGNIN_EMAIL_CHANGED,
    SIGNIN_PASSWORD_CHANGED,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    SIGNIN,
    SIGNIN_CLEARDOWN
} from './actionTypes';

import apiUtils from '../../utility/apiUtils'
import params from '../../../params-sample';
export const cleardown = () => {
    return {type: SIGNIN_CLEARDOWN };
};

export const emailChanged = (text) => {
    return {type: SIGNIN_EMAIL_CHANGED, payload: text};
};

export const passwordChanged = (text) => {
    return {type: SIGNIN_PASSWORD_CHANGED, payload: text};
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const access_token = getState().auth.access_token;
            if (!access_token) {
                reject();
            } else {
                resolve(access_token);
            }
        });
        return promise;
    };
};


export const signin = ({ username, password}) => {

    if (!password) {
        console.log("Illegal password");
        return {
            type: SIGNIN_FAIL,
            error: 'Illegal password'
        }
    }

    return async (dispatch) => {

        dispatch({type: SIGNIN});

        const bodyParams = {
            username: username,
            password: password,
        };

        let url = `${params.apiUrl}/login`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: qs.stringify(bodyParams)
        })
            .then((response) => response.json())
            .then(responseJson => {
                console.log('responseJson', responseJson);
                if (responseJson.error) {
                    return dispatch({
                        type: SIGNIN_FAIL,
                        error: responseJson.error_description || 'Authentication Failed'
                    });
                }
                const {access_token, refresh_token} = responseJson;
                //
                // Actions.main({type: 'reset'});
                dispatch({
                    type: SIGNIN_SUCCESS,
                    payload: {
                        accessToken: access_token,
                        refreshToken: refresh_token
                    }
                });
            })
            .catch(err => {
                console.error(err);
                return dispatch({
                    type: SIGNIN_FAIL,
                    error: 'Authentication Failed'
                });
            });

    };

};
