import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from "react-native";
import { connect } from "react-redux";

import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import beautiful_place from "../../assets/beautiful-place.jpg";
import validate from "../../utility/validation";
import { tryAuth, authAutoSignIn } from "../../store/actions/index";
import { Card, CardSection, Input, Button, Spinner, ImageView } from '../common';
import { emailChanged, passwordChanged, signin, cleardown } from '../../store/actions/signin';
import AwesomeAlert from "react-native-awesome-alerts";
import {setAlertMessage} from "../../store/actions/attendance";

class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
        authMode: "login",
        controls: {
            username: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 3
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 3
                },
                touched: false
            }
        }
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    componentDidMount() {
        //this.props.onAutoSignIn();
    }
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;
        //this.props.signin({ email, password })
        const authData = {
            username: this.state.controls.username.value,
            password: this.state.controls.password.value
        };
        this.props.onTryAuth(authData, this.state.authMode);
    }

    closeMessageHandler = () => {
        this.props.hideMessage(false);
    };
    onForgotPasswordButtonPress() {
        //Actions.forgot();
    }

    renderSubmitButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.authHandler}>
                LOGIN
            </Button>
        );

    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === "login" ? "signup" : "login"
            };
        });
    };

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    };

    authHandler = () => {
        const authData = {
            username: this.state.controls.username.value,
            password: this.state.controls.password.value
        };
        this.props.onTryAuth(authData, this.state.authMode);
    };

    renderForgotButton() {
        if (this.props.loading) {
            return <View />
        }
        return (
            <CardSection>
                <Button style={{ backgroundColor: '#44C7F4' }} onPress={this.onForgotPasswordButtonPress.bind(this)}>
                    FORGOT
                </Button>
            </CardSection>
        );
    }

    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        if (key === "password") {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid:
                            true
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue
                        ),
                        touched: true
                    }
                }
            };
        });
    };

    render() {
        let showAlert = this.props.auth.showErrors;
        console.log(showAlert);
        let headingText = null;
        let confirmPasswordControl = null;
        let messageAlert = null;
        let customMessage = this.props.auth.errors;
        if(showAlert) {
            messageAlert = <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="AwesomeAlert"
                message={customMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="OK!"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    this.closeMessageHandler();
                }}
            />;
        }
        let submitButton = (
            <ButtonWithBackground
                color="#29aaf4"
                onPress={this.authHandler}
            >
                Submit
            </ButtonWithBackground>
        );

        if (this.state.viewMode === "portrait") {
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }

        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />;
        }
        return (
            <View>
                <Card style={{ borderWidth: 0 }}>
                    <CardSection style={{ backgroundColor: '#222228',  borderColor: '#222228' }}>
                        <ImageView />
                    </CardSection>
                </Card>
                <Card>
                    <CardSection>
                        <Input
                            label="username"
                            placeholder="username"
                            onChangeText={val => this.updateInputState("username", val)}
                            value={this.state.controls.username.value}

                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            secureTextEntry
                            label="password"
                            placeholder="password"
                            onChangeText={val => this.updateInputState("password", val)}
                            value={this.state.controls.password.value}

                        />
                    </CardSection>

                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>

                    <CardSection>
                        {this.renderSubmitButton()}
                    </CardSection>
                    {this.renderForgotButton()}

                </Card>
            </View>
        );
    }
}
const styles = {
    errorTextStyle: {
        fontSize: 14,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
        onAutoSignIn: () => dispatch(authAutoSignIn()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
