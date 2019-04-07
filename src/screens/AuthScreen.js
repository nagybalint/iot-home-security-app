import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import Banner from '../components/Banner';

class AuthScreen extends Component {
    render() {

        const {
            containerStyle,
            bannerContainerStyle,
            buttonContainerStyle,
            buttonStyle
        } = styles;

        const { navigate } = this.props.navigation;

        return(
            <View style={containerStyle}>
                <View style={bannerContainerStyle}>
                    <Banner />
                </View>
                <View style={buttonContainerStyle}>
                    <Button 
                        title="Register"
                        buttonStyle={buttonStyle}
                        onPress={() => { navigate('register') }}
                    />
                    <Button 
                        title="Log In"
                        buttonStyle={buttonStyle}
                        onPress={() => { navigate('login') }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        padding: 6,
        flex: 1
    },
    bannerContainerStyle: {
        marginTop: 20
    },
    buttonContainerStyle: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        padding: 12
    },
    buttonStyle: {
        margin: 3,
        height:70,
        backgroundColor: "#3D6DCC"
    }
});

export default AuthScreen;