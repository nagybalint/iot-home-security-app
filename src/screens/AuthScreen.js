import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import Banner from '../components/Banner';

class AuthScreen extends Component {
    render() {
        return(
            <View style={styles.containerStyle}>
                <View style={styles.bannerContainerStyle}>
                    <Banner />
                </View>
                <View style={styles.buttonContainerStyle}>
                    <Button 
                        title="Register"
                        buttonStyle={styles.buttonStyle}
                    />
                    <Button 
                        title="Log In"
                        buttonStyle={styles.buttonStyle}
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
        marginTop: 60
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