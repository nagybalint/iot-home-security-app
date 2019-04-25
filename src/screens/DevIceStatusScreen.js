import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

import DeviceStatus from '../components/DeviceStatus';

class DeviceStatusScreen extends Component {

    componentDidMount() {
        this.props.fetchDeviceStatus(this.props.device_id);
    }

    requestDeviceStatus = async () => {
        await this.props.sendStatusUpdateRequest(this.props.device_id);
    }

    renderRefreshButton = () => {
        const { 
            deviceStatus,
            statusUpdateRequest
        } = this.props;

        const loading = statusUpdateRequest.in_progress;
        // Refresh button disabled while the device status is being fetched or a
        // status update request is being sent
        const disabled = deviceStatus.in_progress || statusUpdateRequest.in_progress;

        const { refreshButtonStyle } = styles;

        return (
            <Button
                buttonStyle={refreshButtonStyle}
                disabledStyle={refreshButtonStyle}
                containerStyle={{
                    padding: 0
                }}
                icon={{ 
                    name: 'sync',
                    color: `rgba(255, 255, 255, ${disabled ? '0.25' : '1.0'})`
                }}
                iconRight={false}
                loading={loading}
                loadingProps={{
                    color: '#fff'
                }}
                title={null}
                disabled={disabled}
                type='clear'
                onPress={this.requestDeviceStatus}
            />
        );
    }

    renderError = () => {
        const {
            errorContainerStyle,
            errorStyle
        } = styles;

        const {
            deviceStatus,
            statusUpdateRequest
        } = this.props;

        // If there is no error, return an empty View
        if(!deviceStatus.error && !statusUpdateRequest.error) {
            return (<View></View>);
        }

        // Only display status update request error if there is no device status error
        const error = deviceStatus.error ? deviceStatus.error : statusUpdateRequest.error;

        return (
            <View style={errorContainerStyle} >
                <Text style={errorStyle} >
                    {`${error}`}
                </Text>
            </View>
        );

    }

    renderSpinner = () => {
        // If the device status fetch is in progress, display a spinner
        const { in_progress } = this.props.deviceStatus;
        
        if(!in_progress){
            return (<View></View>);
        }

        return (
            <View style={styles.spinnerContainerStyle} >
                <ActivityIndicator
                    size="large"
                    color="#3D6DCC"
                />
            </View>
        );
    }

    renderDeviceStatus = () => {
        const { device_status } = this.props.deviceStatus; 

        // If no device status has been fetched, return an empty View
        if(!device_status) {
            return (<View></View>);
        }

        const {
            timestamp,
            cameraImageURL,
            motionStatus
        } = device_status;

        return (
            <DeviceStatus 
                    timestamp={timestamp}
                    image={cameraImageURL}
                    motionStatus={motionStatus}
            />
        );
    } 

    render() {

        const {
            containerStyle,
            centerComponentStyle
        } = styles;

        return(
            <View style={containerStyle}>
                <Header 
                    centerComponent={{
                        text: "DEVICE STATUS",
                        style: centerComponentStyle
                    }}
                    leftComponent={{
                        icon: 'menu',
                        color: '#fff',
                        onPress: this.props.navigation.openDrawer
                    }}
                    rightComponent={this.renderRefreshButton()}
                    statusBarProps={{
                        translucent: true
                    }}
                    containerStyle={{
                        backgroundColor: "#3D6DCC"
                    }}
                />
                {this.renderError()}
                {this.renderSpinner()}
                {this.renderDeviceStatus()}
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
    spinnerContainerStyle: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    refreshButtonStyle: {
        padding: 0,
        height: 40,
        width: 40
    },
    errorContainerStyle: {
        marginTop: 10,
        height: 20,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    errorStyle: {
        color: 'red'
    }
});

function mapStateToProps({ deviceStatus, deviceInfo, deviceStatusUpdate }) {
    const { device_id } = deviceInfo;
    return { 
        deviceStatus, 
        device_id, 
        statusUpdateRequest: deviceStatusUpdate 
    };
}

export default connect(mapStateToProps, actions)(DeviceStatusScreen);
