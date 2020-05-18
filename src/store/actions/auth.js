import AsyncStorage from '@react-native-community/async-storage';
import * as qs from "qs";
import {TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN, LOGIN_ERROR, SHOW_MESSAGE, CLOSE_LOGIN_ERROR} from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";
import App from "../../../App";
import params from "../../../params-sample";
import {Navigation} from "react-native-navigation";
import RNCryptor from 'react-native-rncryptor';

let randomString = require('random-string');

export const getSecretPassword = async () => {
    try {
        const value = await AsyncStorage.getItem('ap:auth:secret_password');
        if (value != null) {
            console.log("SECRET PASSWORD ALREADY IN STORE");
            return value;
        } else {
            let secret_password = randomString();
            console.log("GENERATED NEW SECRET PASSWORD");
            AsyncStorage.setItem('ap:auth:secret_password', secret_password);
            return secret_password;
        }
    } catch (error) {
        console.log(error);
    }

};


export const tryAuth = (authData, authMode) => {
    return async dispatch => {
        //dispatch(uiStartLoading());
        let secret_password = await getSecretPassword();
        console.log(secret_password);

        let url = `${params.apiUrl}/authentication/login`;
        console.log(authData.username + "+++++++++++");
        console.log(authData.password + "+++++++++++");

        RNCryptor.encrypt(authData.username, secret_password).then((encryptedbase64) => {
            console.log(encryptedbase64);
            let data = qs.stringify({
                username: authData.username,
                password: authData.password,
                keyphrase: secret_password,
                message: encryptedbase64
            });
            fetch(url, {
                method: "POST",
                headers: {
                    // Accept: "application/json",
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data

            })

                .then(res => res.json())
                .then(parsedRes => {
                    console.log(parsedRes);
                    console.log(parsedRes.access_token);
                    if (!parsedRes.access_token) {
                        //alert("Authentication failed, please try again!");
                        //dispatch(loginError(parsedRes));
                        alert(parsedRes);
                    } else {
                        dispatch(
                            authStoreToken(
                                parsedRes.access_token,
                                parsedRes.refresh_token,
                                authData.username
                            )
                        );
                        startMainTabs();
                    }
                })
                .catch(err => {
                    console.log("CATCH ERROR");
                    console.log(err);
                    alert(err);
                });

        }).catch((error) => {
            console.log(error)
        });

    };
};

export const loginError = (message) =>{
    return {
        type: LOGIN_ERROR,
        errors: message
    };
};



export const authStoreToken = (access_token, refresh_token, username) => {
    return dispatch => {
        dispatch(authSetToken(access_token, refresh_token, username));
        AsyncStorage.setItem("ap:auth:access_token", access_token);
        AsyncStorage.setItem("ap:auth:refresh_token", refresh_token);
    };
};

export const authSetToken = (token, refreshToken, username) => {
    return {
        type: AUTH_SET_TOKEN,
        access_token: token,
        refresh_token: refreshToken,
        username: username
    };
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            console.log(getState());
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


/*export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.access_token;
            if (!token ) {
                let fetchedToken;
                AsyncStorage.getItem("ap:auth:access_token")
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        fetchedToken = tokenFromStorage;
                        if (!tokenFromStorage) {
                            reject();
                            return;
                        }
                        return AsyncStorage.getItem("ap:auth:expiryDate");
                    })
                    .then(expiryDate => {
                        const parsedExpiryDate = new Date(parseInt(expiryDate));
                        const now = new Date();
                        if (parsedExpiryDate > now) {
                            dispatch(authSetToken(fetchedToken));
                            resolve(fetchedToken);
                        } else {
                            reject();
                        }
                    })
                    .catch(err => reject());
            } else {
                resolve(token);
            }
        });
        return promise
            .catch(err => {
                return AsyncStorage.getItem("ap:auth:refreshToken")
                    .then(refreshToken => {
                        return fetch(
                            "https://securetoken.googleapis.com/v1/token?key=" + API_KEY,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                body: "grant_type=refresh_token&refresh_token=" + refreshToken
                            }
                        );
                    })
                    .then(res => res.json())
                    .then(parsedRes => {
                        if (parsedRes.id_token) {
                            console.log("Refresh token worked!");
                            dispatch(
                                authStoreToken(
                                    parsedRes.id_token,
                                    parsedRes.expires_in,
                                    parsedRes.refresh_token
                                )
                            );
                            return parsedRes.id_token;
                        } else {
                            dispatch(authClearStorage());
                        }
                    });
            })
            .then(token => {
                if (!token) {
                    throw new Error();
                } else {
                    return token;
                }
            });
    };
};
*/

/*export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                startMainTabs();
            })
            .catch(err => console.log("Failed to fetch token!"));
    };
};*/

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("ap:auth:access_token");
        //AsyncStorage.removeItem("ap:auth:secret_password");
        return AsyncStorage.removeItem("ap:auth:refresh_token");
    };
};

let restartApp = () => {
    let loginRoot = {
        root: {
            component: {
                name: 'mobile_client_rel'
            }
        }
    };
    Navigation.setRoot(loginRoot);
};

export const authLogout = () => {
    return dispatch => {
        dispatch(authClearStorage()).then(() => {
            restartApp();
        });
        dispatch(authRemoveToken());
    };
};

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    };
};
