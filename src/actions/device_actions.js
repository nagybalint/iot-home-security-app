import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

import { 
    ADD_DEVICE_SUCCESS,
    ADD_DEVICE_FAIL,
    DEVICE_INFO_FETCH_IN_PROGRESS,
    DEVICE_INFO_FETCH_SUCCESS,
    DEVICE_INFO_FETCH_FAIL,
    DEVICE_STATUS_FETCH_SUCCESS,
    DEVICE_STATUS_FETCH_IN_PROGRESS
} from './types';
import { getDeviceId } from '../services/device_management';

export const addDevice = (device_id, verification_code) => async (dispatch) => {
    let addDeviceFun = firebase.functions().httpsCallable('add_device');
    try {
        console.log(`Calling add_device endpoint with ${device_id}, ${verification_code}`);
        let result = await addDeviceFun({device_id, verification_code});
        
        console.log(`Adding device success = ${result.success}`);

        await AsyncStorage.setItem('deviceId', device_id);
        dispatch({ type: ADD_DEVICE_SUCCESS, payload: device_id });
    } catch (error) {
        console.log(`Error adding device ${error.message}`);
        // if device for the user already exists,
        // try fetching the device id again
        dispatch({ type: ADD_DEVICE_FAIL, payload: error.message });
    }
}

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
            dispatch({ type: DEVICE_INFO_FETCH_FAIL, payload: null });
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

export const fetchDeviceStatus = (deviceId) => async (dispatch) => {
    console.log(`Fetching status of device ${deviceId}`);
    dispatch({ type: DEVICE_STATUS_FETCH_IN_PROGRESS, payload: {} });

    let doc = firebase.firestore().collection('devices').doc(deviceId);

    let observer = doc.onSnapshot(async (docSnapshop) => {
        let state = docSnapshop.get('state');
        console.log(`Device State read - ${state}`);

        const { timestamp, camera_image, motion_status } = state;

        let cameraImageURL;
        if (!camera_image) {
            cameraImageURL = null;
        } else {
            const imageRef = firebase.storage().ref(camera_image);
            try {
                cameraImageURL = await imageRef.getDownloadURL();
            } catch (error) {
                console.log(error);
            }
        }
        
        console.log(`Payload assembled - ${payload}`);

        const payload = {
            timestamp,
            cameraImageURL,
            motionStatus: motion_status
        };

        console.log(payload);

        dispatch({ type: DEVICE_STATUS_FETCH_SUCCESS, payload: payload });
    }, err => {
        console.log(`Error fetch status of ${deviceId}! Error: ${err}`);
    });
}
