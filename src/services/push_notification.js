import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

export const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        getToken();
    } else {
        requestPermission();
    }
}

export const getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
    console.log(`FCM Token is ${fcmToken}`);
}

export const requestPermission = async () => {
    try {
        await firebase.messaging().requestPermission();
        getToken();
    } catch (err) {
        console.log('Permission Rejected');
    }
}