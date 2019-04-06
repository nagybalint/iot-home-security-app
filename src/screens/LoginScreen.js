import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Banner from '../components/Banner';
import AuthInput from '../components/AuthInput';


class LoginScreen extends Component {
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
                    placeholderPassword="Password"
                    submitTitle="Log In"
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