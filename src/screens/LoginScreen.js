import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Banner from '../components/Banner';
import AuthInput from '../components/AuthInput';

import sleep from '../utils/sleep';

class LoginScreen extends Component {
    checkEmailFormat = (email) => {
        const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        return pattern.test(email);
    }

    submitLoginRequest = async (user, password) => {
        console.log("Started");
        await sleep(5000);
        console.log("Finished");
    }

    render() {
        return(
            <View style={styles.containerStyle}>
            <View style={styles.bannerContainerStyle}>
                <Banner />
            </View>
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
    authContainerStyle: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        margin: 12
    }
});

export default LoginScreen;