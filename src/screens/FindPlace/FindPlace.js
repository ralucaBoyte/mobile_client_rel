import React, {Component} from "react";
import {View, Text, Button, StyleSheet} from "react-native";
import {connect} from "react-redux";
import PlaceList from "../../components/PlaceList/PlaceList";
import {Navigation} from "react-native-navigation";
import { Dropdown } from 'react-native-material-dropdown';
import {addReviewForProfessor, getAllProfessorsForStudent, setCurrentProfessor} from "../../store/actions/reviews";
import {markAttendance, setAlertMessage} from "../../store/actions/attendance";
import TextInput from "react-native-web/src/exports/TextInput";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import validate from "../../utility/validation";
import NumericInput from 'react-native-numeric-input'

class FindPlaceScreen extends Component{

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
    }

    onChangeHandler = (value) => {
        console.log(`Selected value: ${value}`);
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
                        //valid: validate(val, prevState.controls.feedback.validationRules),
                        //touched: true
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
            console.log(this.state.controls.feedback);
            let submitButton = (
                <Button
                    title="Grade professor!"
                    onPress={this.giveGradeForProfessor}
                    // disabled={
                    //     !this.state.controls.feedback.valid
                    // }
                />
            );

            let data = this.props.reviews.professors;
            let values = [];
            data.map(user => values.push({value: user.username}));
            return (
                <View>

                <Dropdown
                    label='Professor list'
                    data={values}
                    onChangeText = {(value => this.onChangeHandler(value))}
                />
                <PlaceInput
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
                        leftButtonBackgroundColor='#E56B70'/>
                    <View style={styles.button}>{submitButton}</View>
                </View>


            );
        }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150
    },
    button: {
        margin: 8
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
});


const mapStateToProps = state => {
    return {
        reviews: state.reviews
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetProfessors: () => dispatch(getAllProfessorsForStudent()),
        onChangedProfessorHandler: (username) => dispatch(setCurrentProfessor(username)),
        onGiveGradeReview: (professor, feedback, reviewGrade) => dispatch(addReviewForProfessor(professor, feedback, reviewGrade))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (FindPlaceScreen);

