import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { 
    checkEmailFormat,
    checkPasswordFormat
} from '../utils/patterns';
import Banner from '../components/Banner';
import AuthInput from '../components/AuthInput';

const FIREBASE_CONFIG = require('../../config/firebase.json');

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }
    
    registerUser = async (email, password) => {
        console.log("Registering mobile user");
        let fcmToken = await AsyncStorage.getItem('fcmToken');
    
        const endPointURL = `${FIREBASE_CONFIG['functions_base_url']}/register_mobile_user`;
        
        try {
            console.log(`Sending user registration request for ${email} to ${endPointURL}`);
            let res = await axios.post(endPointURL, {
                email,
                password,
                fcm_token: fcmToken
            });
            
            console.log(`Response status -  ${res.status}`);

            this.setState({
                error: null
            }, () => { 
                // If the user registration was successful, forward to the login screen
                this.props.navigation.navigate('login'); 
            });

        } catch (error) {
            const { data } = error.response;
            console.log(data);
            this.setState({
                error: data.error
            });
        }
    }
    
    renderRegistrationError = () => {
        const { errorContainerStyle, errorMessageStyle } = styles;

        const { error } = this.state;

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
                {
                    this.renderRegistrationError()
                }
                <View style={authContainerStyle}>
                    <AuthInput 
                        confirmPassword={true}
                        securePassword={true}
                        placeholderUser="Email"
                        userRules={{
                            checker: checkEmailFormat,
                            message: "Please enter a valid Email address"
                        }}
                        passwordRules={{
                            checker: checkPasswordFormat,
                            message: "The password must be at least 6 characters long!"
                        }}
                        placeholderPassword="Password"
                        submitTitle="Register"
                        submitAction={this.registerUser}
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

export default RegisterScreen;

