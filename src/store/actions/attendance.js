import { uiStartLoading, uiStopLoading, authGetToken } from "./index";
import {AUTH_SET_TOKEN, GET_ATTENDANCES_FOR_STUDENT, SET_ATTENDANCE_INFO_ID, SHOW_MESSAGE} from "./actionTypes";


export const markAttendance = (attendance_info_id_response) => {
    return dispatch => {

        console.log(attendance_info_id_response);
        console.log("+++++++++++ Mark attendance ++++++++++++");
        console.log("For attendance info with id = " + attendance_info_id_response);

        let authToken;
        let url_attendance = "http://localhost:8080/attendance/student";

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
                if(parsedRes.status >= 400){
                    dispatch(setAlertMessage(parsedRes.message, true, 0, 0));
                }
                else {
                    dispatch(setAlertMessage("You marked attendance at ", true, parsedRes.activity, parsedRes.course));
                    dispatch(getAllAttendancesForStudent());
                    dispatch(setAttendanceInfoId(Number(attendance_info_id_response)));
                }
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
    };
};

export const getAllAttendancesForStudent = () => {
    return dispatch => {

        console.log("+++++++++++ GET ALL attendances for student ++++++++++++");

        let authToken;
        let url_professors = "http://localhost:8080/attendance/student-attendances";

        //dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
            })
            .then(access_token => {
                //console.log(access_token + " ACCESS TOKEN ");
                authToken = access_token;
                return fetch(url_professors, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + authToken
                    }
                });
            })
            .then(res => res.json())
            .then(allAttendances => {
                console.log("Done!");
               // console.log(allAttendances);
                dispatch(setAttendacesForStudent(allAttendances));

            })
            .catch(err => {
                alert("Something went wrong, sorry :/");
                console.log(err);
            });
    };
};

export const setAttendacesForStudent = (attendances) => {
    return {
        type: GET_ATTENDANCES_FOR_STUDENT,
        attendances_student: attendances
    };
};

export const setAlertMessage = (message, message_visible, activity, course) => {
    return dispatch => {
        dispatch(changeAlertMessage(message, message_visible, activity, course));
    };
};




export const changeAlertMessage = (message, message_visible, activity, course) => {
    return {
        type: SHOW_MESSAGE,
        showAlert: message_visible,
        activity: activity,
        course: course,
        message: message
    };
};

export const setAttendanceInfo = (attendance_info_id) => {
    return dispatch => {
        dispatch(setAttendanceInfoId(attendance_info_id));
    };
};

export const setAttendanceInfoId = (attendance_info_id) => {
    return {
        type: SET_ATTENDANCE_INFO_ID,
        attendance_info_id: attendance_info_id,
    };
};


