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
    // Try to access fcmToken saved in AsyncStorage from a previous session
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    // If not found in AsyncStorage, get token from firebase and save it in AsyncStorage
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
    console.log(`FCM Token - ${fcmToken}`);
}

export const requestPermission = async () => {
    try {
        await firebase.messaging().requestPermission();
        getToken();
    } catch (err) {
        console.log('Permission to receive messages rejected');
        console.log(err);
    }
}