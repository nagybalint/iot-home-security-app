import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const PADDING_SIDE = 6;
const IMAGE_WIDTH = SCREEN_WIDTH - 2 * PADDING_SIDE;
const IMAGE_HEIGHT = parseInt(IMAGE_WIDTH / 640.0 * 480.0);

class DeviceStatus extends Component {
    getMotionStatus = () => {
        if(typeof this.props.motionStatus === 'undefined') {
            return 'No information available';
        }

        if(this.props.motionStatus) {
            return 'Detecting motion';
        } else {
            return 'No motion detected';
        }
    }

    formatTime = (timestamp) => {
        if(!timestamp) {
            return 'No information available';
        }

        return `${timestamp.getHours()}:${timestamp.getMinutes()} - ${timestamp.toDateString()}`;
    }

    renderImage = (imageSource) => {
        if(!imageSource) {
            return (
                <Text style={styles.textStyle}>
                    No information available
                </Text>
            );
        } 

        return (
            <Image 
                source={{uri: imageSource}}
                style={styles.imageStyle}
            />
        );
    }

    render() {
        return(
            <View style={styles.containerStyle}>
                <View style={styles.flexContainerStyle}>
                    <Text style={styles.headerStyle}>
                        Last Synced At
                    </Text>
                    <Text style={styles.textStyle}>
                        {this.formatTime(this.props.timestamp)}
                    </Text>
                </View>
                <View style={styles.flexContainerStyle}>
                    <Text style={styles.headerStyle}>
                        Camera Image
                    </Text>
                    {this.renderImage(this.props.image)}
                </View>
                <View style={styles.flexContainerStyle}>
                    <Text style={styles.headerStyle}>
                        Motion Sensor Status
                    </Text>
                    <Text style={styles.textStyle}>
                        {this.getMotionStatus()}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        padding: PADDING_SIDE
    },
    flexContainerStyle: {
        justifyContent: "center",
        alignItems: "center"
    },
    headerStyle: {
        fontSize: 20,
        color: "#3D6DCC",
        paddingBottom: 6
    },
    textStyle: {
        fontSize: 16
    },
    imageStyle: {
        height: IMAGE_HEIGHT,
        width: IMAGE_WIDTH
    }
});

export default DeviceStatus;