import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
    Image,
    Divider
} from 'react-native-elements';

class DeviceStatus extends Component {
    getMotionStatus = () => {
        if(this.props.motionStatus) {
            return 'Detecting motion';
        } else {
            return 'No motion detected';
        }
    }

    render() {
        return(
        <View>
            <Text>Last synced at {this.props.timestamp}</Text>
            <Divider />
            <Text>Camera Image</Text>
            <Image 
                source={{uri: this.props.image}}
                style={styles.imageStyle}
            />
            <Divider />
            <Text>Motion Sensor Status</Text>
            <Text>{this.getMotionStatus()}</Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 250,
        width: 400
    }
});

export default DeviceStatus;