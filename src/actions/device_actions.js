import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

import { 
    ADD_DEVICE_SUCCESS,
    ADD_DEVICE_FAIL,
    DEVICE_INFO_FETCH_IN_PROGRESS,
    DEVICE_INFO_FETCH_SUCCESS,
    DEVICE_INFO_FETCH_FAIL,
    DEVICE_STATUS_FETCH_SUCCESS,
    DEVICE_STATUS_FETCH_IN_PROGRESS,
    DEVICE_STATUS_FETCH_FAIL,
    DEVICE_STATUS_UPDATE_REQUEST_IN_PROGRESS,
    DEVICE_STATUS_UPDATE_REQUEST_SUCCESS,
    DEVICE_STATUS_UPDATE_REQUEST_FAIL
} from './types';

export const addDevice = (device_id, verification_code) => async (dispatch) => {
    let addDeviceFun = firebase.functions().httpsCallable('add_device');
    try {
        console.log(`Calling add_device endpoint with ${device_id}, ${verification_code}`);
        let result = await addDeviceFun({device_id, verification_code});
        
        console.log(`Success - ${result.success}`);

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
            console.log(`Device Id Fetch failed due to no device being registered to the user yet`);
            // This is not an error, dispatch the action with a payload of null
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

    console.log('Registering listener for the device record in firestore');
    let observer = doc.onSnapshot(async (docSnapshop) => {
        console.log('Device status updated');

        let state = docSnapshop.get('state');

        const { timestamp, camera_image, motion_status } = state;

        // Get a download URL to the camera image if present in the device status
        let cameraImageURL;
        if (!camera_image) {
            cameraImageURL = null;
        } else {
            console.log('Create download URL for the camera image')
            const imageRef = firebase.storage().ref(camera_image);
            try {
                cameraImageURL = await imageRef.getDownloadURL();
            } catch (error) {
                console.log(error);
            }
        }

        const payload = {
            timestamp,
            cameraImageURL,
            motionStatus: motion_status
        };

        console.log(`Action payload assembled`);
        console.log(payload);

        dispatch({ type: DEVICE_STATUS_FETCH_SUCCESS, payload: payload });
    }, err => {
        console.log(`Error occured during fetching the status of ${deviceId}! Error: ${err}`);
        dispatch({ 
            type: DEVICE_STATUS_FETCH_FAIL, 
            payload: 'Could not download device status! Please refresh!' 
        });
    });
}

export const sendStatusUpdateRequest = (deviceId) => async (dispatch) => {
    console.log(`Sendind status update request to ${deviceId}`);
    dispatch({ type: DEVICE_STATUS_UPDATE_REQUEST_IN_PROGRESS, payload: {} });

    let sendCommand = firebase.functions().httpsCallable('send_command');

    try {
        let result = await sendCommand.call({ });
        const { success } = result.data;
        if(success) {
            dispatch({ type: DEVICE_STATUS_UPDATE_REQUEST_SUCCESS, payload: {} });
        } else {
            dispatch({ 
                type: DEVICE_STATUS_UPDATE_REQUEST_FAIL, 
                payload: 'Status update request could not be sent! Please try again!' 
            });
        }
    } catch (error) {
        console.log(`Sending status update request failed - ${error}`);
        dispatch({ type: DEVICE_STATUS_UPDATE_REQUEST_FAIL, payload: error.message });
    }
}
