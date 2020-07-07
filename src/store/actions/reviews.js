import { uiStartLoading, uiStopLoading, authGetToken } from "./index";
import {
    GET_ALL_PROFESSORS,
    ADD_REVIEW_FOR_PROFESSOR,
    CHANGED_CURRENT_PROFESSOR,
    GET_ALL_QUESTIONS
} from "./actionTypes";
import AsyncStorage from "@react-native-community/async-storage";
import {setAttendanceInfo, setAttendanceInfoId} from "./attendance";

export const getAllProfessorsForStudent = () => {
    return dispatch => {

        console.log("+++++++++++ GET ALL PROFESSORS ++++++++++++");

        let authToken;
        let url_professors = "http://localhost:8080/authentication/professors";

        //dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
            })
            .then(access_token => {
                console.log(access_token + " ACCESS TOKEN ");
                authToken = access_token;
                return fetch(url_professors, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + authToken
                    }
                });
            })
            .then(res => res.json())
            .then(professors => {
                console.log("Done!");
                //console.log(professors);
                dispatch(getProfessors(professors));

            })
            .catch(err => {
                alert("Something went wrong, sorry :/");
                console.log(err);
            });
    };
};

//-----------------------------get intrebari-----------------------------------

//------------------------------------------------------------------------


export const addReviewForProfessor = (professor, feedback, reviewGrade) => {
    return dispatch => {

        console.log("+++++++++++ ADD REVIEW FOR PROFESSOR ++++++++++++");

        let authToken;
        let url_professors = "http://localhost:8080/authentication/reviews";

        //dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
            })
            .then(access_token => {
                //console.log(access_token + " ACCESS TOKEN ");
                authToken = access_token;
                return fetch(url_professors, {
                    method: "POST",
                    body: JSON.stringify({
                        professor: professor,
                        feedback: feedback,
                        reviewGrade: reviewGrade
                    }),
                    headers: {
                        Authorization: "Bearer " + authToken,
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });
            })
            .then(res => res.json())
            .then(response => {
                console.log("Done!");
                //console.log(response);
                alert(response);
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
    };
};

export const addResponsesForQuestion = (responses) => {
    return dispatch => {

        console.log("+++++++++++ ADD RESPONSE FOR QUESTION ++++++++++++");

        let authToken;
        let url_professors = "http://localhost:8080/attendance/add-responses";

        //dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
            })
            .then(access_token => {
                authToken = access_token;
                return fetch(url_professors, {
                    method: "POST",
                    body: JSON.stringify(responses),
                    headers: {
                        Authorization: "Bearer " + authToken,
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });
            })
            .then(res => res.json())
            .then(response => {
                console.log("Done!");
                alert(response.response);
                dispatch(setAttendanceInfo(0));
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
    };
};


export const getQuestions = () => {
    return dispatch => {

        console.log("+++++++++++ GET QUESTIONS ++++++++++++");

        let authToken;
        let url_questions = "http://localhost:8080/attendance/all-questions";

        //dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
            })
            .then(access_token => {
                //console.log(access_token + " ACCESS TOKEN ");
                authToken = access_token;
                return fetch(url_questions, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + authToken,
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });
            })
            .then(res => res.json())
            .then(response => {
                console.log("Done!");
                dispatch(setQuestionsDispatch(response));

            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
    };
};

export const setQuestionsDispatch = (questions) => {
    console.log(questions);
    return {
        type: GET_ALL_QUESTIONS,
        questions: questions
    };
};

export const getProfessors = (professors) => {
    return {
        type: GET_ALL_PROFESSORS,
        professors: professors
    };
};


export const setCurrentProfessor = (username) => {
    return {
        type: CHANGED_CURRENT_PROFESSOR,
        currentProfessor: username
    }
};
