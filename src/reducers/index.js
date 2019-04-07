import { combineReducers } from 'redux';
import deviceStatus from './device_status_reducer';
import auth from './auth_reducers';

export default combineReducers({
    deviceStatus, auth
});
