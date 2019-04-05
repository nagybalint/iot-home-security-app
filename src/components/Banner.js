import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';

const Banner = () => (
    <View style={styles.containerStyle}>
        <Image 
            source={require('../../res/img/logo.png')}
            style={styles.logoStyle} 
        />
        <Text style={styles.textStyle}>
            IoT Home Security
        </Text>
    </View>
);

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    textStyle: {
        fontSize: 20,
        paddingTop: 6,
        paddingLeft: 0
    },
    logoStyle: {
        height: 60,
        width: 60
    }
});

export default Banner;

