import { combineReducers } from 'redux';
import deviceStatus from './device_status_reducer';
import auth from './auth_reducers';
import deviceInfo from './device_info_reducer';

export default combineReducers({
    auth, deviceInfo, deviceStatus
});
