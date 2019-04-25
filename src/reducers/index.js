import { combineReducers } from 'redux';
import deviceStatus from './device_status_reducer';
import auth from './auth_reducers';
import deviceInfo from './device_info_reducer';
import deviceStatusUpdate from './device_update_reducer';

import { USER_LOGOUT_SUCCESS } from '../actions/types';
import AsyncStorage from '@react-native-community/async-storage';

const appReducer = combineReducers({
    auth, deviceInfo, deviceStatus, deviceStatusUpdate
});

export default rootReducer = (state, action) => {
    if(action.type === USER_LOGOUT_SUCCESS ) {
        // If the user has logged out, remove any user related variables from
        // AsyncStorage and reset application state
        AsyncStorage.removeItem('deviceId');
        state = undefined;
    }

    return appReducer(state, action);
}
