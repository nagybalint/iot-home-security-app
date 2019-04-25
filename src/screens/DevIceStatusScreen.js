import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Icon } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import sleep from '../utils/sleep';

import * as actions from '../actions';

import DeviceStatus from '../components/DeviceStatus';

class DeviceStatusScreen extends Component {

    componentDidMount() {
        console.log('DeviceStatusScreen did mount');
        this.props.fetchDeviceStatus(this.props.device_id);
    }

    requestDeviceStatus = async () => {
        console.log("Requesting Device Status");
        await this.props.sendStatusUpdateRequest(this.props.device_id);
    }

    renderRefreshButton = () => {
        const { 
            in_progress,
            statusUpdateRequest
        } = this.props;

        const disabled = in_progress || statusUpdateRequest.in_progress;
        const loading = statusUpdateRequest.in_progress;

        return (
            <Button
                buttonStyle={styles.refreshButtonStyle}
                disabledStyle={styles.refreshButtonStyle}
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

    renderSpinner = () => {
        const { in_progress, device_status } = this.props;
        
        if(!in_progress){
            return (<View></View>);
        }

        return (
            <View 
                style={styles.spinnerContainerStyle}
            >
                <ActivityIndicator
                    size="large"
                    color="#3D6DCC"
                />
            </View>
        );
    }

    renderDeviceStatus = () => {
        const { device_status } = this.props; 
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
        console.log("Rendering DeviceStatusScreen");
        return(
            <View style={styles.containerStyle}>
                <Header 
                    centerComponent={{
                        text: "DEVICE STATUS",
                        style: styles.centerComponentStyle
                    }}
                    leftComponent={{
                        icon: 'menu',
                        color: '#fff',
                        onPress: this.props.navigation.openDrawer
                    }}
                    rightComponent={this.renderRefreshButton()}
                    statusBarProps={{translucent: true}}
                    containerStyle={{
                        backgroundColor: "#3D6DCC"
                    }}
                />
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
    }
});

function mapStateToProps({ deviceStatus, deviceInfo, deviceStatusUpdate }) {
    const { in_progress, device_status } = deviceStatus;
    const { device_id } = deviceInfo;
    return { 
        in_progress, 
        device_status, 
        device_id, 
        statusUpdateRequest: deviceStatusUpdate 
    };
}

export default connect(mapStateToProps, actions)(DeviceStatusScreen);
