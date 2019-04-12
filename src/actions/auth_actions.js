import firebase from 'react-native-firebase';

import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL
} from './types';

export const userLoggedIn = (user) => {
    console.log('User login success');
    return { type: USER_LOGIN_SUCCESS, payload: user };
}

export const userLoggedOut = () => {
    console.log('User logout success');
    return { type: USER_LOGOUT_SUCCESS, payload: {} };
}

export const logInUser = (user, password) => async (dispatch) => {
    try {
        console.log('Starting user login');
        let userCredential = await firebase.auth().signInWithEmailAndPassword(user, password); 
        // On success, the new state will be returned from the userLoggedIn action,
        // called from the Auth State Change listener
    } catch (err) {
        console.log("Login Failed");
        dispatch( { type: USER_LOGIN_FAIL, payload: err });
    }
}

export const logOutUser = () => async (dispatch) => {
    try {
        console.log('Starting user logout');
        await firebase.auth().signOut();
        // On success, the new state will be returned from the userLoggedOut action,
        // called from the Auth State Change listener
    } catch (error) {
        console.log('Logging out not succesful');
        dispatch({ type: USER_LOGOUT_FAIL, payload: error });
    }
}