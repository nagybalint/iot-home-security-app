import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Banner from '../components/Banner';
import AuthInput from '../components/AuthInput';

import sleep from '../utils/sleep';

class LoginScreen extends Component {

    componentDidMount() {
        this.onAuthComplete(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    submitLoginRequest = async (user, password) => {
        console.log(`Started with ${user}`);
        await this.props.logInUser(user, password);
        console.log("Finished");
    }

    checkEmailFormat = (email) => {
        const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        return pattern.test(email);
    }

    onAuthComplete = (props) => {
        if(props.user) {
            this.props.navigation.navigate('addDevice');
        }
    }

    renderLoginError = () => {
        const { errorContainerStyle, errorMessageStyle } = styles;

        if(!this.props.error) {
            return (<View style={errorContainerStyle}></View>);
        }

        return (
            <View style={errorContainerStyle}>
                <Text style={errorMessageStyle}>
                    Loggin In Not Successful! Please try again!
                </Text>
            </View>
        );
    }

    render() {
        return(
            <View style={styles.containerStyle}>
            <View style={styles.bannerContainerStyle}>
                <Banner />
            </View>
            {this.renderLoginError()}
            <View style={styles.authContainerStyle}>
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
        marginTop: 60
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

function mapStateToProps(state) {
    const { auth } = state;
    const { user, error } = auth;
    return { user, error };
}

export default connect(mapStateToProps, actions)(LoginScreen);
