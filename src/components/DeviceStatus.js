import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const PADDING_SIDE = 6;
const IMAGE_WIDTH = SCREEN_WIDTH - 2 * PADDING_SIDE;
const IMAGE_HEIGHT = parseInt(IMAGE_WIDTH / 640.0 * 480.0);

class DeviceStatus extends Component {
    getMotionStatus = () => {
        const { motionStatus } = this.props;

        if(typeof motionStatus === 'undefined') {
            return 'No information available';
        }

        if(motionStatus) {
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
        const {
            textStyle,
            imageStyle
        } = styles;

        if(!imageSource) {
            return (
                <Text style={textStyle}>
                    No information available
                </Text>
            );
        } 

        return (
            <Image 
                source={{
                    uri: imageSource
                }}
                style={imageStyle}
            />
        );
    }

    render() {
        const {
            containerStyle,
            flexContainerStyle,
            headerStyle,
            textStyle
        } = styles;

        const {
            timestamp,
            image
        } = this.props;

        return(
            <View style={containerStyle}>
                <View style={flexContainerStyle}>
                    <Text style={headerStyle}>
                        Last Synced At
                    </Text>
                    <Text style={textStyle}>
                        {this.formatTime(timestamp)}
                    </Text>
                </View>
                <View style={flexContainerStyle}>
                    <Text style={headerStyle}>
                        Camera Image
                    </Text>
                    {this.renderImage(image)}
                </View>
                <View style={flexContainerStyle}>
                    <Text style={headerStyle}>
                        Motion Sensor Status
                    </Text>
                    <Text style={textStyle}>
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