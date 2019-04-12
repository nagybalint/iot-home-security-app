import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

import * as actions from '../actions';

export class SettingsScreen extends Component {
    logOutUser = async () => {
        await this.props.logOutUser();
        console.log('Waiting for logout over');
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.user) {
            this.props.navigation.navigate('auth');
        }
    }

    renderError = () => {
        if(!this.props.error) {
            return (<View></View>);
        }

        return (
            <View>
                <Text>
                    Logging Out not successful! Please try again!
                </Text>
            </View>
        );
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
            {this.renderError()}
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

function mapStateToProps({ auth }) {
    const { user, error } = auth;
    return {
        user, error
    };
}

export default connect(mapStateToProps, actions)(SettingsScreen);
