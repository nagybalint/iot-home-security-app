import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Banner from '../components/Banner';
import AuthInput from '../components/AuthInput';

class LoginScreen extends Component {

    componentDidMount() {
        this.onAuthComplete(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete = (props) => {
        // If the user has successfully logged in, forward to the addDevice screen
        if(props.user) {
            this.props.navigation.navigate('addDevice');
        }
    }

    submitLoginRequest = async (user, password) => {
        await this.props.logInUser(user, password);
    }

    checkEmailFormat = (email) => {
        const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        return pattern.test(email);
    }

    renderLoginError = () => {
        const { errorContainerStyle, errorMessageStyle } = styles;

        const { error } = this.props;

        // If there is no login error, display empty view
        if(!error) {
            return (<View style={errorContainerStyle}></View>);
        }

        return (
            <View style={errorContainerStyle}>
                <Text style={errorMessageStyle}>
                    {`${error}`}
                </Text>
            </View>
        );
    }

    render() {

        const {
            containerStyle,
            bannerContainerStyle,
            authContainerStyle
        } = styles;

        return(
            <View style={containerStyle}>
                <View style={bannerContainerStyle}>
                    <Banner />
                </View>
                {this.renderLoginError()}
                <View style={authContainerStyle}>
                    <AuthInput 
                        confirmPassword={false}
                        securePassword={true}
                        placeholderUser="Email"
                        userRules={{
                            checker: this.checkEmailFormat,
                            message: "Please enter a valid Email address"
                        }}
                        placeholderPassword="Password"
                        submitTitle="Log In"
                        submitAction={this.submitLoginRequest}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        padding: 6,
        flex: 1,
        minHeight: 400
    },
    bannerContainerStyle: {
        marginTop: 20
    },
    errorContainerStyle: {
        height: 30,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    errorMessageStyle: {
        color: 'red',
        fontSize: 12
    },
    authContainerStyle: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        margin: 12
    }
});

function mapStateToProps({ auth }) { 
    const { user, error } = auth;
    return { user, error };
}

export default connect(mapStateToProps, actions)(LoginScreen);
