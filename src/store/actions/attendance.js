import { uiStartLoading, uiStopLoading, authGetToken } from "./index";

export const markAttendance = (attendance_info_id_response) => {
    return dispatch => {

        let attendance_info_id = attendance_info_id_response.split("--")[0];
        console.log("+++++++++++ Mark attendance ++++++++++++");
        console.log("For attendance info with id = " + attendance_info_id);

        let authToken;
        let url_attendance = "http://localhost:8080/attendance/student";

        dispatch(uiStartLoading());
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
                        attendanceInfoId: attendance_info_id
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
            })
            .catch(err => {
                alert("Something went wrong, sorry :/");
                console.log(err);
            });
    };
};
