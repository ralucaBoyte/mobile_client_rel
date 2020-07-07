import React, {Component} from "react";
import {View, Text, Button, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import {connect} from "react-redux";
import {Navigation} from "react-native-navigation";
import { Dropdown } from 'react-native-material-dropdown';
import {
    addReviewForProfessor,
    getAllProfessorsForStudent,
    getQuestions,
    setCurrentProfessor
} from "../../store/actions/reviews";

import PlaceInput from "../../components/PlaceInput/PlaceInput";
import NumericInput from 'react-native-numeric-input'
import PlaceDetail from "../PlaceDetail/PlaceDetail";


//const WATER_IMAGE = require('./water.png')


class ReviewScreen extends Component{

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
        this.state = {currentProfessor: ''};
    }

    componentDidMount() {
        this.props.onGetProfessors();
        //this.props.onGetQuestions();
    }

    onChangeHandler = (value) => {
        //console.log(`Selected value: ${value}`);
        this.props.onChangedProfessorHandler(value);
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

    feedbackChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    feedback: {
                        ...prevState.controls.feedback,
                        value: val,

                    }
                }
            };
        });
    };



    reviewGradeChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    reviewGrade: {
                        value: val
                    }
                }
            };
        });
    };

    UNSAFE_componentWillMount() {
        this.reset();
    }

    reset = () => {
        this.setState({
            controls: {
                feedback: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                },
                reviewGrade: {
                    value: null
                },
                reviewFromStudent: {
                    questions: null
                }
            }
        });
    };

    giveGradeForProfessor = () => {
        this.props.onGiveGradeReview(
            this.props.reviews.currentProfessor,
            this.state.controls.feedback.value,
            this.state.controls.reviewGrade.value
        );
        this.reset();

    };

        render() {

            let data = this.props.reviews.professors;

            let values = [];
            data.map(user => values.push({value: user.username}));
            return (
                <View style={styles.container}>

                <Dropdown
                    label='Professor list'
                    data={values}
                    onChangeText = {(value => this.onChangeHandler(value))}
                />
                <View style={styles.second_container}>
                <PlaceInput
                    style={styles.professor}
                    placeData={this.state.controls.feedback}
                    onChangeText={this.feedbackChangedHandler}
                />

                    <NumericInput
                        value={this.state.value}
                        onChange={this.reviewGradeChangedHandler}
                        onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                        totalWidth={240}
                        totalHeight={50}
                        iconSize={25}
                        step={0.5}
                        maxValue={10}
                        valueType='real'
                        rounded
                        textColor='#B0228C'
                        iconStyle={{ color: 'white' }}
                        rightButtonBackgroundColor='#EA3788'
                        leftButtonBackgroundColor='#E56B70'
                    />
                    <TouchableOpacity style={styles.grade} onPress={this.giveGradeForProfessor}>
                        <Text style={styles.gradeText}>Send observations</Text>
                    </TouchableOpacity>
                </View>

                </View>


            );
        }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 3,
        marginBottom: 3,
        padding: 20
    },
    second_container: {
        marginTop: 30,
        alignItems: 'center'
    },
    professor: {
        width: '100%',
        padding: 3,
        height: 10
    },
    feedback: {
        height: 10,
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
        backgroundColor:"#fa8072",
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
    }
});


const mapStateToProps = state => {
    return {
        reviews: state.reviews,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetProfessors: () => dispatch(getAllProfessorsForStudent()),
        onChangedProfessorHandler: (username) => dispatch(setCurrentProfessor(username)),
        onGiveGradeReview: (professor, feedback, reviewGrade) => dispatch(addReviewForProfessor(professor, feedback, reviewGrade)),
       // onGetQuestions: () => dispatch(getQuestions())
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (ReviewScreen);

