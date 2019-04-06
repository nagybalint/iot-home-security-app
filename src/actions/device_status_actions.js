import { DEVICE_STATUS_FETCH_SUCCESS } from './types';

export const fetchDeviceStatus = () => async (dispatch) => {
    dispatch({ type: DEVICE_STATUS_FETCH_SUCCESS, payload: { yes: 'yes' } });
}
