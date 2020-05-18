import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
    View,
    Dimensions
} from 'react-native';
import { connect } from "react-redux";
import QRCodeScanner from 'react-native-qrcode-scanner';
import {markAttendance, setAlertMessage} from "../../store/actions/attendance";
import AwesomeAlert from "react-native-awesome-alerts";

class ScanScreen extends Component {
    onSuccess = e => {
        let attendance_info_id = e.data.split("--")[0];
        console.log(attendance_info_id);
        this.markAttendanceHandler(attendance_info_id);
    };

    markAttendanceHandler = (attendance_info_id) => {
        this.props.onMarkAttendance(
            attendance_info_id
        )
    };

    closeMessageHandler = () => {
        this.props.hideMessage(false);
    };

    render() {
        let showAlert = this.props.attendance.showAlert;
        let customMessage = `You marked attendance at \n ` + this.props.attendance.course + '-' + this.props.attendance.activity;
        let messageAlert = null;
        if(showAlert) {
            messageAlert = <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="AwesomeAlert"
                message={customMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Great!"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    this.closeMessageHandler();
                }}
            />;
        }
        return (
            <View style={styles.container}>
            <QRCodeScanner
                onRead={this.onSuccess}
                topContent={
                    <Text style={styles.centerText}>
                        Scan the QR code to mark your attendance
                    </Text>

                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text style={styles.buttonText}> </Text>
                    </TouchableOpacity>
                }
                cameraStyle={{ height: Dimensions.get("window").height }}
            />
                {messageAlert}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    },
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    }
});



function mapStateToProps(state) {
    return {
        attendance: state.attendance
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onMarkAttendance: (attendance_info_id) =>
            dispatch(markAttendance(attendance_info_id)),
        hideMessage: () => dispatch(setAlertMessage(false))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (ScanScreen);

