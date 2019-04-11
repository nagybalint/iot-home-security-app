import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

import DeviceStatus from '../components/DeviceStatus';

class DeviceStatusScreen extends Component {

    componentDidMount() {
        console.log('DeviceStatusScreen did mount');
        this.props.fetchDeviceStatus(this.props.device_id);
    }

    requestDeviceStatus = () => {
        // TODO!
        console.log("Requesting Device Status");
    }

    renderSpinner = () => {
        const { in_progress, device_status } = this.props;
        
        if(!in_progress){
            return (<View></View>);
        }

        return (
            <View 
                style={
                    !device_status ? 
                        styles.spinnerInCenterContainerStyle : 
                        styles.spinnerOnTopContainerStyle
                }
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
            camera_image,
            motion_status
        } = device_status;

        return (
            <DeviceStatus 
                    timestamp={timestamp}
                    image={camera_image}
                    motionStatus={motion_status}
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
                    rightComponent={{ 
                        icon: 'sync', 
                        color: '#fff',
                        onPress: this.requestDeviceStatus
                    }}
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
    spinnerOnTopContainerStyle: {
        marginTop: 20,
        marginBottom: 20
    },
    spinnerInCenterContainerStyle: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
});

function mapStateToProps({ deviceStatus, deviceInfo}) {
    const { in_progress, device_status } = deviceStatus;
    const { device_id } = deviceInfo;
    return { in_progress, device_status, device_id };
}

export default connect(mapStateToProps, actions)(DeviceStatusScreen);
