import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { Button, Header } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

import DeviceStatus from '../components/DeviceStatus';

class DeviceStatusScreen extends Component {

    componentDidMount() {
        this.props.fetchDeviceStatus();
    }

    renderSpinner = () => {
        return (<View></View>);
    }

    renderDeviceStatus = () => {
        if(!this.props.device_status) {
            return (<View></View>);
        }

        const {
            timestamp,
            camera_image,
            motion_status
        } = this.props.device_status;

        console.log(
            `Props received: ${timestamp}, ${motion_status}, ${camera_image}`
        );

        return (
            <DeviceStatus 
                    timestamp={timestamp}
                    image={camera_image}
                    motionStatus={motion_status}
            />
        );
    } 

    render() {
        console.log("Rendering");
        return(
            <View style={styles.containerStyle}>
                <Header 
                    centerComponent={{
                        text: "DEVICE STATUS",
                        style: styles.centerComponentStyle
                    }}
                    rightComponent={{ 
                        icon: 'sync', 
                        color: '#fff' 
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
    }
});

function mapStateToProps(state) {
    const { in_progress, device_status } = state.deviceStatus;
    return { in_progress, device_status };
}

export default connect(mapStateToProps, actions)(DeviceStatusScreen);
