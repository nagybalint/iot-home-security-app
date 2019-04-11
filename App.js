/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import { Provider } from 'react-redux';

import store from './src/store';
import { checkPermission } from './src/services/push_notification';
import { showNotificationAlert } from './src/components/NotificationAlert';
import AuthScreen from './src/screens/AuthScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import AddDeviceScreen from './src/screens/AddDeviceScreen';
import DeviceStatusScreen from './src/screens/DevIceStatusScreen';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component<Props> {
    async cleanSheet() {
        await AsyncStorage.removeItem('deviceId');
        await firebase.auth().signOut();
    }
    
    async componentDidMount() {
        checkPermission();
        this.createNotificationListeners();
        //await this.cleanSheet();
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
            authFlow: createBottomTabNavigator({
                auth: {
                    screen: AuthScreen
                },
                register: {
                    screen: RegisterScreen
                },
                login: {
                    screen: LoginScreen
                }
            }),
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
            <Provider store={store} >
                <AppContainer />
            </Provider>
        );
    }
}