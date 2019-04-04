/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';

import firebase from 'react-native-firebase';

import { checkPermission } from './src/services/push_notification';
import { showNotificationAlert } from './src/components/notification_alert';
import DeviceStatusScreen from './src/screens/DevIceStatusScreen';
import AuthScreen from './src/screens/AuthScreen';
import AddDeviceScreen from './src/screens/AddDeviceScreen';

export default class App extends Component<Props> {
    async componentDidMount() {
        checkPermission();
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
                showNotificationAlert(title, body);
            }
        );

        this.notificationOpenedListener = firebase.notifications().onNotificationOpened(
            (notificationOpen) => {
                const { title, body } = notificationOpen.notification.data;
                showNotificationAlert(title, body);
            }
        );

        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification.data;
            showNotificationAlert(title, body);
        }

        this.messageListener = firebase.messaging().onMessage(
            (message) => {
                console.log(JSON.stringify(message));
            }
        );
    }

    render() {
        const MainNavigator = createBottomTabNavigator({
            auth: {
                screen: AuthScreen
            },
            addDevice: {
                screen: AddDeviceScreen
            },
            deviceStatus: {
                screen: DeviceStatusScreen
            }
        }, {
            lazy: true
        });

        const AppContainer = createAppContainer(MainNavigator);

        return (
            <AppContainer />
        );
    }
}