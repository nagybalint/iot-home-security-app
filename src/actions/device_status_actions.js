import firebase from 'react-native-firebase';

import { DEVICE_STATUS_FETCH_SUCCESS } from './types';
import { getDeviceId } from '../services/device_management';

export const fetchDeviceStatus = () => async (dispatch) => {
    let deviceId = await getDeviceId();

    let doc = firebase.firestore().collection('devices').doc(deviceId);

    let observer = doc.onSnapshot(docSnapshop => {
        let state = docSnapshop.get('state');
        console.log(`Device State - ${state.timestamp}`);
        dispatch({ type: DEVICE_STATUS_FETCH_SUCCESS, payload: state });
    }, err => {
        console.log(`Error fetch status of ${deviceId}! Error: ${err}`);
    });
}
