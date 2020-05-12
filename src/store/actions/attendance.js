import { uiStartLoading, uiStopLoading, authGetToken } from "./index";
import {AUTH_SET_TOKEN, SHOW_MESSAGE} from "./actionTypes";
import AsyncStorage from "@react-native-community/async-storage";

export const markAttendance = (attendance_info_id_response) => {
    return dispatch => {

        console.log(attendance_info_id_response);
        console.log("+++++++++++ Mark attendance ++++++++++++");
        console.log("For attendance info with id = " + attendance_info_id_response);

        let authToken;
        let url_attendance = "http://localhost:8080/attendance/student";

        //dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
            })
            .then(access_token => {

                console.log(access_token + " ACCESS TOKEN ");
                authToken = access_token;
                return fetch(url_attendance, {
                    method: "POST",
                    body: JSON.stringify({
                        attendanceInfoId: attendance_info_id_response
                    }),
                    headers: {
                        Authorization: "Bearer " + authToken,
                        "Content-Type": "application/json"
                    }
                });
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log("Done!");
                console.log(parsedRes);
                dispatch(setAlertMessage(true, parsedRes.activity, parsedRes.course));

            })
            .catch(err => {
                alert("Something went wrong, sorry :/");
                console.log(err);
            });
    };
};

export const setAlertMessage = (message_visible, activity, course) => {
    return dispatch => {
        dispatch(changeAlertMessage(message_visible, activity, course));
    };
};

export const changeAlertMessage = (message_visible, activity, course) => {
    return {
        type: SHOW_MESSAGE,
        showAlert: message_visible,
        activity: activity,
        course: course
    };
};
