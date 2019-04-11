import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

export class SettingsScreen extends Component {
    logOutUser = () => {

    }
    
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
            <View style={styles.buttonContainerStyle} >
                <Button 
                    buttonStyle={styles.buttonStyle}
                    title="Log Out"
                    onPress={this.logOutUser}
                />
            </View>
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
    },
    buttonContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: 12
    },  
    buttonStyle: {
        margin: 3,
        height:70,
        backgroundColor: "#3D6DCC"
    }
});

export default SettingsScreen;
