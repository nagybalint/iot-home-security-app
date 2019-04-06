import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';

import AuthInput from '../components/AuthInput';

class AddDeviceScreen extends Component {
    render() {
        return(
            <View style={styles.containerStyle}>
                <Header 
                    centerComponent={{
                        text: "ADD DEVICE",
                        style: styles.centerComponentStyle
                    }}
                    statusBarProps={{translucent: true}}
                    containerStyle={{
                        backgroundColor: "#3D6DCC"
                    }}
                />
                <View style={styles.authContainerStyle}>
                    <AuthInput 
                        confirmPassword={false}
                        securePassword={false}
                        placeholderUser="Device Id"
                        placeholderPassword="Verification Code"
                        submitTitle="Add Device"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    centerComponentStyle: {
        color: '#fff',
        fontSize: 16
    },
    authContainerStyle: {
        marginTop: 80,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        margin: 12,
        padding: 6
    }
});

export default AddDeviceScreen;