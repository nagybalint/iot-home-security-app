import { 
    DEVICE_STATUS_FETCH_IN_PROGRESS,
    DEVICE_STATUS_FETCH_SUCCESS,
    DEVICE_STATUS_FETCH_FAIL
 } from '../actions/types';

const INTIAL_STATE = {
    in_progress: false,
    device_status: null
};

export default function(state = INTIAL_STATE, action) {
    switch(action.type) {
        case DEVICE_STATUS_FETCH_IN_PROGRESS:
            return {
                ...state, 
                in_progress: true
            };
        case DEVICE_STATUS_FETCH_SUCCESS:
            return { 
                in_progress: false,
                device_status: action.payload 
            };
        case DEVICE_STATUS_FETCH_FAIL:
            return {
                in_progress: false,
                device_status: null,
                error: action.payload
            }
        default:
            return state;
    }
}
