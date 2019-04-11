import {
    DEVICE_INFO_FETCH_IN_PROGRESS,
    DEVICE_INFO_FETCH_FAIL,
    DEVICE_INFO_FETCH_SUCCESS,
    ADD_DEVICE_SUCCESS,
    ADD_DEVICE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    in_progress: false,
    device_id: null,
    error: null
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_DEVICE_SUCCESS: 
            return {
                in_progress: false,
                error: null,
                device_id: action.payload
            };
        case ADD_DEVICE_FAIL: 
            return {
                in_progress: false,
                error: action.payload,
                device_id: null
            };
        case DEVICE_INFO_FETCH_IN_PROGRESS:
            return {
                ...state,
                in_progress: true
            };
        case DEVICE_INFO_FETCH_SUCCESS:
            return {
                in_progress: false,
                error: null,
                device_id: action.payload
            };
        case DEVICE_INFO_FETCH_FAIL:
            return {
                in_progress: false,
                error: action.payload,
                device_id: null
            }
        default:
            return state;
    }
}