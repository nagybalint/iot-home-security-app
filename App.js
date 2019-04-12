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
    createDrawerNavigator, 
    createSwitchNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { Provider, connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import * as actions from './src/actions';
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

class RootComponent extends Component {
    async cleanSheet() {
        await AsyncStorage.removeItem('deviceId');
        await firebase.auth().signOut();
    }
    
    async componentDidMount() {
        checkPermission();
        this.createNotificationListeners();
        this.createAuthStateListener();
        //await this.cleanSheet();
    }

    async componentWillUnmount() {
        this.createAuthStateListener();
        this.notificationListener();
        this.notificationOpenedListener();
    }

    createAuthStateListener = () => {
        // Firebase auth returns an unsubsciber method
        this.authstateListener = firebase.auth().onAuthStateChanged(
            (user) => {
                console.log(`AuthStateListener fired with ${user}`);
                if(!user) {
                    // Fire logged out action
                    this.props.userLoggedOut();
                } else {
                    // Fire logged in action
                    this.props.userLoggedIn(user);
                }
            }
        );
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
        const MainNavigator = createSwitchNavigator({
            authFlow: createSwitchNavigator({
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
                    screen: createSwitchNavigator({
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
            <AppContainer />
        );
    }
}

const Root = connect(null, actions)(RootComponent);

export default class App extends Component{
    render() {
        return (
            <Provider store={store} >
                <Root />
            </Provider>
        );
    }
}