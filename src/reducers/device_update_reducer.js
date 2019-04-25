import {
    DEVICE_STATUS_UPDATE_REQUEST_IN_PROGRESS,
    DEVICE_STATUS_UPDATE_REQUEST_SUCCESS,
    DEVICE_STATUS_UPDATE_REQUEST_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    in_progress: false,
    error: null
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case DEVICE_STATUS_UPDATE_REQUEST_IN_PROGRESS:
            return {
                in_progress: true,
                error: null
            };
        case DEVICE_STATUS_UPDATE_REQUEST_SUCCESS:
            return {
                in_progress: false,
                error: null
            };
        case DEVICE_STATUS_UPDATE_REQUEST_FAIL:
            return {
                in_progress: false,
                error: action.payload
            };
        default:
            return state;
    }
}
