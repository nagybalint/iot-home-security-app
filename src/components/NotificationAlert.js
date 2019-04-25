import { Alert } from 'react-native';

export const showNotificationAlert = (title, body) => {
    Alert.alert(
        title, body, 
        [
            {text: 'OK', onPress: () => console.log('Notification Alert dismissed')}
        ],
        { cancelable: false }
    );
  }