import { 
    DEVICE_STATUS_FETCH_IN_PROGRESS,
    DEVICE_STATUS_FETCH_SUCCESS
 } from '../actions/types';

const INTIAL_STATE = {
    in_progress: false,
    device_status: null
};

export default function(state = INTIAL_STATE, action) {
    switch(action.type) {
        case DEVICE_STATUS_FETCH_IN_PROGRESS:
            return {
                device_status: null, 
                in_progress: true
            };
        case DEVICE_STATUS_FETCH_SUCCESS:
            return { 
                in_progress: false,
                device_status: action.payload 
            };
        default:
            return state;
    }
}
