import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { connect } from "react-redux";

import {Navigation} from 'react-native-navigation';
import {addReviewForProfessor, getAllProfessorsForStudent, setCurrentProfessor} from "../../store/actions/reviews";
import { FlatList } from "react-native";
import { Card } from "react-native-elements";
import {getAllAttendancesForStudent} from "../../store/actions/attendance";

class HomeScreen extends Component {

    state = {
        attendances: []
    };
    static navigatorStyle = {
        navBarButtonColor: "orange"
    };

    static options() {
        return {
            topBar: {
                leftButtons: {
                    id: 'openSideDrawer',
                    icon: require('../../assets/side_menu.png')
                }
            }
        };
    }
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    componentDidMount() {
        this.props.onGetAttendances();
        this.setState({
            attendances: this.props.attendance.attendances_student
        });

    }


    navigationButtonPressed({ buttonId }) {
        if (buttonId === "openSideDrawer") {
            Navigation.mergeOptions('sideDrawerToggle', {
                sideMenu: {
                    left: {
                        visible: true
                    }
                }
            });
        }
    }

    render() {
        const viewStyles = [
            styles.container,
            { backgroundColor: 'orange' }
        ];
        const textStyles = {
            color: 'white',
            fontSize: 40,
            fontWeight: 'bold'
        };


        getAllAttendancesForStudent();
        let attendancesStudent = this.props.attendance.attendances_student;
        //console.log("HOME SCREEN=============================");
        //console.log(attendancesStudent);
        return (
            <FlatList

                data={attendancesStudent}
                renderItem={({ item: rowData }) => {
                    return (
                        <Card
                            title={null}
                        >
                            <Text style={{ marginBottom: 10 }}>
                                {rowData.name} - { rowData.type }
                            </Text>
                            <Text style={{ marginBottom: 10 }}>
                                Week {rowData.week}
                            </Text>
                        </Card>
                    );
                }}
                keyExtractor={(item, id) => id.toString()}
            />
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
        attendance: state.attendance,
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAttendances: () => dispatch(getAllAttendancesForStudent())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
