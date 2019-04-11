import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import * as actions from '../actions';

import AuthInput from '../components/AuthInput';
import AsyncStorage from '@react-native-community/async-storage';

class AddDeviceScreen extends Component {
    componentDidMount() {
        console.log('AddDeviceScreen did mount');
        this.props.fetchDeviceInfo();
        this.onFetchComplete(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        console.log('AddDeviceScreen will receive new props');
        this.onFetchComplete(nextProps);
    }

    onFetchComplete = (props) => {
        if(props.device_id) {
            this.props.navigation.navigate('deviceStatus');
        }
    }

    renderScreen = () => {
        if(this.props.device_fetch_in_progress) {
            return (
                <ActivityIndicator
                    size="large"
                    color="#3D6DCC"
                />
            );
        } else {
            return (
                <AuthInput 
                    confirmPassword={false}
                    securePassword={false}
                    placeholderUser="Device Id"
                    placeholderPassword="Verification Code"
                    submitTitle="Add Device"
                    submitAction={this.props.addDevice}
                />
            );
        }
    }

    renderAddDeviceError = () => {
        console.log('Error render called');
        if (!this.props.error) {
            return (
                <View style={styles.errorContainerStyle} >
                </View>
            );
        }
        
        console.log('Adding error :) ');
        return (
            <View style={styles.errorContainerStyle} >
                <Text style={styles.errorStyle}>
                    {this.props.error}
                </Text>
            </View>
        );
    }

    render() {
        console.log('Rendering AddDeviceScreen');
        return(
            <View style={styles.containerStyle}>
                <Header 
                    centerComponent={{
                        text: "ADD DEVICE",
                        style: styles.centerComponentStyle
                    }}
                    leftComponent={{
                        icon: 'menu',
                        color: '#fff',
                        onPress: this.props.navigation.openDrawer
                    }}
                    statusBarProps={{translucent: true}}
                    containerStyle={{
                        backgroundColor: "#3D6DCC"
                    }}
                />
                {this.renderAddDeviceError()}
                <View style={styles.authContainerStyle}>
                    {this.renderScreen()}
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
    errorContainerStyle: {
        marginTop: 40,
        height: 20,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    errorStyle: {
        color: 'red'
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

function mapStateToProps({ deviceInfo }) {
    console.log(`Map state to props addDeviceScreen`);
    const { in_progress, error, device_id } = deviceInfo;
    return { 
        device_fetch_in_progress: in_progress, 
        error: error, 
        device_id: device_id
    };
}

export default connect(mapStateToProps, actions)(AddDeviceScreen);
