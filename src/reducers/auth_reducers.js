import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    user: null,
    error: null
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                user: action.payload,
                error: null
            };
        case USER_LOGIN_FAIL:
            return {
                user: null,
                error: action.payload
            };
        case USER_LOGOUT_SUCCESS:
            return {
                user: null,
                error: null
            };
        case USER_LOGOUT_FAIL: 
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}