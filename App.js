/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { 
    createAppContainer, 
    createBottomTabNavigator, 
    createDrawerNavigator 
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import store from './src/store';
import { checkPermission } from './src/services/push_notification';
import { showNotificationAlert } from './src/components/NotificationAlert';
import AuthScreen from './src/screens/AuthScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import AddDeviceScreen from './src/screens/AddDeviceScreen';
import DeviceStatusScreen from './src/screens/DevIceStatusScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import Drawer from './src/components/Drawer';

// Suppress some non-critical warnings while developing the app
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['ViewPagerAndroid', 'Slider', 'Remote debugger']);

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
            main: createDrawerNavigator({
                Device:  {
                    screen: createBottomTabNavigator({
                        addDevice: {
                            screen: AddDeviceScreen
                        },
                        deviceStatus: {
                            screen: DeviceStatusScreen
                        }
                    }),
                    navigationOptions: ({ navigation }) => ({
                        drawerIcon: ({tintColor}) => (
                            <Icon 
                                name='devices'
                                color={tintColor}
                            />
                        )
                    })
                },
                Settings: {
                    screen: SettingsScreen,
                    navigationOptions: ({ navigation }) => ({
                        drawerIcon: ({tintColor}) => (
                            <Icon 
                                name='settings'
                                color={tintColor}
                            />
                        )
                    })
                }
            }, {
                contentComponent: Drawer,
                contentOptions: {
                    activeTintColor: '#3D6DCC'
                }
            })
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