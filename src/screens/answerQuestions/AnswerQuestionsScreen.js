import React, {Component} from "react";
import {View, Text, Button, StyleSheet, TouchableOpacity, FlatList, Alert, SafeAreaView} from "react-native";
import {connect} from "react-redux";
import {Navigation} from "react-native-navigation";
import { Dropdown } from 'react-native-material-dropdown';
import {
    addResponsesForQuestion,
    addReviewForProfessor,
    getAllProfessorsForStudent,
    getQuestions,
    setCurrentProfessor
} from "../../store/actions/reviews";
import StarRating from 'react-native-star-rating';
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import NumericInput from 'react-native-numeric-input'
import PlaceDetail from "../PlaceDetail/PlaceDetail";


//const WATER_IMAGE = require('./water.png')


class AnswerQuestionsScreen extends Component{

    static options() {
        return {
            topBar: {
                leftButtons: {
                    id: 'openDrawer',
                    icon: require('../../assets/side_menu.png')
                }
            }
        };
    }

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            controls: {
                reviewFromStudent: {
                    questions: null
                }
            },
            starCount1: 3.5,
            starCount2: 3.5,
            starCount3: 3.5
            };
    }

    componentDidMount() {
        //this.props.onGetProfessors();
        this.props.onGetQuestions();
    }

    onChangeHandler = (value) => {
        //console.log(`Selected value: ${value}`);
        this.props.onChangedProfessorHandler(value);
    };

    onStarRatingPress = (rating, id) =>{
        switch(id) {

            case 1:
                this.setState({
                    starCount1: rating,
                });
                break;

            case 2:
                this.setState({
                    starCount2: rating,
                });
                break;

            case 3:
                this.setState({
                    starCount3: rating,
                });

            default:
              //  Alert.alert("NUMBER NOT FOUND");

        }

    };

    itemSelectedHandler = key => {
        const selPlace = this.props.places.find(place => {
            return place.key === key;
        });
        Navigation.push('myStack', {
            component:{
                name: "mobile_client_rel.PlaceDetailScreen",
                passProps: {
                    selectedPlace: selPlace
                },
                options: {
                    topBar: {
                        title: {
                            text: 'Place details'
                        }
                    }
                }
            }
        });
    };
    navigationButtonPressed({ buttonId }) {
        if (buttonId === "openDrawer") {
            Navigation.mergeOptions('sideDrawerToggle', {
                sideMenu: {
                    left: {
                        visible: true
                    }
                }
            });
        }
    }

    UNSAFE_componentWillMount() {
        this.reset();
    }

    reset = () => {
        this.setState({
            controls: {
                reviewFromStudent: {
                    questions: null
                }
            },
            starCount1: 5,
            starCount2: 5,
            starCount3: 5

        });
    };

    getRating = (id) => {
        if(id === 1) {
            return this.state.starCount1;
        }
        else{
            if(id === 2){
                return this.state.starCount2;
            }
            else{
                return this.state.starCount3;
            }
        }

    };


    createListOfResponses = (questions) => {

        let responseList = [
            {
                "intrebare": 1,
                "attendance_id": this.props.attendance_info_id,
                "rating": this.state.starCount1
            },
            {
                "intrebare": 2,
                "attendance_id": this.props.attendance_info_id,
                "rating": this.state.starCount2
            },
            {
                "intrebare": 3,
                "attendance_id": this.props.attendance_info_id,
                "rating": this.state.starCount3
            },
        ];
        //console.log(responseList);
        this.props.answerQuestions(responseList);
    };


    render() {
        let questions = this.props.reviews.questions;
        let attendance_info_id = this.props.attendance_info_id;
        console.log(questions);
        return (
            attendance_info_id !== 0 ? (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={questions}
                    renderItem={({ item }) => <View>
                        <PlaceDetail question={item}/>
                        <StarRating
                            disabled={false}
                            maxStars={10}
                            rating={this.getRating(item.intrebare_id)}
                            selectedStar={(rating) => this.onStarRatingPress(rating, item.intrebare_id)}
                        />
                    </View>}
                    keyExtractor={item => item.intrebare_id}
                />

                <TouchableOpacity style={styles.grade} onPress={() => this.createListOfResponses(questions)}>
                    <Text style={styles.gradeText}>Send survey</Text>
                </TouchableOpacity>

            </SafeAreaView>
            )
                :(
                    <SafeAreaView>
                        <View style={styles.container}>
                            <View>
                                <Text style={styles.placeName}>Taking survey is allowed only after marking attendance!</Text>
                            </View>
                        </View>
                    </SafeAreaView>)


        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 3,

        padding: 10
    },

    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150
    },
    button: {
        marginTop: 20
    },
    grade: {
        width:"80%",
        backgroundColor:"black",
        borderRadius:5,
        height:50,
        alignItems:"center",
        alignSelf: 'center',
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    gradeText:{
        color: 'white'
    },
    previewImage: {
        width: "100%",
        height: "100%"
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 24,
        justifyContent:"center",
        alignItems:"center",
    },
});


const mapStateToProps = state => {
    return {
        reviews: state.reviews,
        attendance_info_id: state.attendance.attendance_info_id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetQuestions: () => dispatch(getQuestions()),
        answerQuestions: (answers) => dispatch(addResponsesForQuestion(answers))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (AnswerQuestionsScreen);

