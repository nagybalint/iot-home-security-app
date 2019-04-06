import { DEVICE_STATUS_FETCH_SUCCESS } from '../actions/types';

export default function(state={}, action) {
    switch(action.type) {
        case DEVICE_STATUS_FETCH_SUCCESS:
            return { status: action.payload };
        default:
            return state;
    }
}
