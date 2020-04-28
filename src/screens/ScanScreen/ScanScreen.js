import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';
import { connect } from "react-redux";
import QRCodeScanner from 'react-native-qrcode-scanner';
import {markAttendance} from "../../store/actions/attendance";

class ScanScreen extends Component {
    onSuccess = e => {
        let attendance_info_id = e.data[0];
        console.log(e.data[0]);
        this.markAttendanceHandler(attendance_info_id);

    };

    markAttendanceHandler = (attendance_info_id) => {
        this.props.onMarkAttendance(
            attendance_info_id
        )
    };

    render() {
        return (
            <QRCodeScanner
                onRead={this.onSuccess}
                //flashMode={QRCodeScanner.Constants.FlashMode.torch}
                topContent={
                    <Text style={styles.centerText}>
                        Scan the QR code to mark your attendance
                    </Text>
                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text style={styles.buttonText}>OK. Got it!</Text>
                    </TouchableOpacity>
                }
            />
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
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onMarkAttendance: (attendance_info_id) =>
            dispatch(markAttendance(attendance_info_id))
    }
};

export default connect(null, mapDispatchToProps) (ScanScreen);

//AppRegistry.registerComponent('default', () => ScanScreen);
