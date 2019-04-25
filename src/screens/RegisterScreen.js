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
        console.log("Registering user");
        let fcmToken = await AsyncStorage.getItem('fcmToken');
    
        const endPointURL = `${FIREBASE_CONFIG['functions_base_url']}/register_mobile_user`;
        console.log(`Sending registration request for ${email} to ${endPointURL}`);
        
        try {
            let res = await axios.post(endPointURL, {
                email,
                password,
                fcm_token: fcmToken
            });

            console.log("Results received");    
            
            const { data } = res;

            console.log(`Status code: ${res.status}`);
            console.log(`Data: ${data}`);

            this.setState({
                error: null
            }, () => { 
                this.props.navigation.navigate('login'); 
            });

        } catch (error) {
            console.log(Object.keys(error.response.data));
            this.setState({
                error: error.response.data.error
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
        return(
        <View style={styles.containerStyle}>
            <View style={styles.bannerContainerStyle}>
                <Banner />
            </View>
            {
                this.renderRegistrationError()
            }
            <View style={styles.authContainerStyle}>
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

