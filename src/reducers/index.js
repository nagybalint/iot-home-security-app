import { combineReducers } from 'redux';
import deviceStatus from './device_status_reducer';
import auth from './auth_reducers';
import deviceInfo from './device_info_reducer';

import { USER_LOGOUT_SUCCESS } from '../actions/types';
import AsyncStorage from '@react-native-community/async-storage';

const appReducer = combineReducers({
    auth, deviceInfo, deviceStatus
});

export default rootReducer = (state, action) => {
    if(action.type === USER_LOGOUT_SUCCESS ) {
        AsyncStorage.removeItem('deviceId');
        state = undefined;
    }

    return appReducer(state, action);
}
