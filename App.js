/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, AsyncStorage, Alert } from 'react-native';
import firebase, { notifications } from 'react-native-firebase';

export default class App extends Component<Props> {
    async componentDidMount() {
        this.checkPermission();
        this.createNotificationListeners();
    }

    async componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
    }

    async createNotificationListeners() {
        this.notificationListener = firebase.notifications().onNotification(
            (notification) => {
                const { title, body } = notification;
                this.showAlert(title, body);
            }
        );

        this.notificationOpenedListener = firebase.notifications().onNotificationOpened(
            (notificationOpen) => {
                const { title, body } = notificationOpen.notification.data;
                this.showAlert(title, body);
            }
        );

        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification.data;
            this.showAlert(title, body);
        }

        this.messageListener = firebase.messaging().onMessage(
            (message) => {
                console.log(JSON.stringify(message));
            }
        );
    }

    showAlert(title, body) {
      console.log(`Alert title: ${title}, alert body ${body}`);
      Alert.alert(
          title, body, 
          [
              {text: 'OK', onPress: () => console.log('On pressed')}
          ],
          { cancelable: false }
      );
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