import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

import AuthInput from '../components/AuthInput';

class AddDeviceScreen extends Component {
    componentDidMount() {
        this.props.fetchDeviceInfo();
        this.onFetchComplete(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this.onFetchComplete(nextProps);
    }

    onFetchComplete = (props) => {
        // If the device id has been fetched successfully, forward to the deviceStatus screen
        if(props.device_id) {
            this.props.navigation.navigate('deviceStatus');
        }
    }

    renderScreen = () => {
        if(this.props.in_progress) {
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
        const { error } = this.props;

        const {
            errorContainerStyle,
            errorStyle
        } = styles;

        if (!error) {
            return (
                <View style={errorContainerStyle} >
                </View>
            );
        }
        
        return (
            <View style={errorContainerStyle} >
                <Text style={errorStyle}>
                    {`${error}`}
                </Text>
            </View>
        );
    }

    render() {

        const {
            containerStyle,
            centerComponentStyle,
            authContainerStyle
        } = styles;

        return(
            <View style={containerStyle}>
                <Header 
                    centerComponent={{
                        text: "ADD DEVICE",
                        style: centerComponentStyle
                    }}
                    leftComponent={{
                        icon: 'menu',
                        color: '#fff',
                        onPress: this.props.navigation.openDrawer
                    }}
                    statusBarProps={{
                        translucent: true
                    }}
                    containerStyle={{
                        backgroundColor: "#3D6DCC"
                    }}
                />
                {this.renderAddDeviceError()}
                <View style={authContainerStyle}>
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
    const { in_progress, error, device_id } = deviceInfo;
    return { 
        in_progress, 
        error, 
        device_id
    };
}

export default connect(mapStateToProps, actions)(AddDeviceScreen);
