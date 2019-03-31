/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

export default class App extends Component<Props> {
    async componentDidMount() {
        this.checkPermission();
    }

    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
              await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
        console.log(`fcm Token is ${fcmToken}`);
    }

    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            this.getToken();
        } catch (err) {
            console.log('permission rejected');
        }
    }

    render() {
        return (
            <View>
                <Text>Hello world</Text>
            </View>
        );
    }
}