import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

export class SettingsScreen extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>
            <Header 
                centerComponent={{
                    text: "SETTINGS",
                    style: styles.centerComponentStyle
                }}
                leftComponent={{
                    icon: 'menu',
                    color: '#fff',
                    onPress: this.props.navigation.openDrawer
                }}
                statusBarProps={{translucent: true}}
                containerStyle={{
                    backgroundColor: "#3D6DCC"
                }}
            />
            <Text>Hello Settings</Text>
        </View>
        );
    };
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    centerComponentStyle: {
        color: '#fff',
        fontSize: 16
    }
});

export default SettingsScreen;
