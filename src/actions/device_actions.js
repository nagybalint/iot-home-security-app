import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

import { 
    DEVICE_INFO_FETCH_IN_PROGRESS,
    DEVICE_INFO_FETCH_SUCCESS,
    DEVICE_INFO_FETCH_FAIL,
    DEVICE_STATUS_FETCH_SUCCESS,
    DEVICE_STATUS_FETCH_IN_PROGRESS
} from './types';
import { getDeviceId } from '../services/device_management';


export const fetchDeviceInfo = () => async (dispatch) => {
    dispatch({ type: DEVICE_INFO_FETCH_IN_PROGRESS, payload: {} });

    console.log("Device Id fetch in progress");

    let deviceId = await AsyncStorage.getItem('deviceId');
    if(deviceId) {
        console.log("Device Id found in AsyncStorage");
        dispatch({ type: DEVICE_INFO_FETCH_SUCCESS, payload: deviceId });
        return;
    }

    console.log("Start fetching DeviceId from firebase");
    let fetchDeviceId = firebase.functions().httpsCallable('fetch_device_id');
    try {
        let result = await fetchDeviceId.call({ });
        console.log(`Results is - ${result.data.device_id}`);
        const { device_id } = result.data;
        if(!device_id) {
            console.log(`Device Id Fetch failed`);
            dispatch({ type: DEVICE_INFO_FETCH_FAIL, payload: {} });
        } else {
            console.log(`Device Id fetch successful - ${device_id}`);
            await AsyncStorage.setItem('deviceId', device_id);
            dispatch({ type: DEVICE_INFO_FETCH_SUCCESS, payload: device_id });
        }
    } catch (error) {
        console.log(`Error - ${error}`);
        dispatch({ type: DEVICE_INFO_FETCH_FAIL, payload: error });
    }
}

export const fetchDeviceStatus = () => async (dispatch) => {
    dispatch({ type: DEVICE_STATUS_FETCH_IN_PROGRESS, payload: {} });

    let deviceId = await getDeviceId();

    let doc = firebase.firestore().collection('devices').doc(deviceId);

    let observer = doc.onSnapshot(docSnapshop => {
        let state = docSnapshop.get('state');
        dispatch({ type: DEVICE_STATUS_FETCH_SUCCESS, payload: state });
    }, err => {
        console.log(`Error fetch status of ${deviceId}! Error: ${err}`);
    });
}
