import firebase from 'react-native-firebase';

import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL
} from './types';

export const logInUser = (user, password) => async (dispatch) => {
    const loggedInUser = firebase.auth().currentUser;
    if (loggedInUser) {
        console.log(`loggedInUser ${loggedInUser}`);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: loggedInUser });
    }
    try {
        let userCredential = await firebase.auth().signInWithEmailAndPassword(user, password);
        let { loggedInUser } = userCredential;
        console.log("Login Successful");
        dispatch({ type: USER_LOGIN_SUCCESS, payload: loggedInUser }) 
    } catch (err) {
        console.log("Login Failed");
        dispatch( { type: USER_LOGIN_FAIL, payload: err });
    }

}