import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import Banner from '../components/Banner';

class AuthScreen extends Component {

    componentDidMount() {
        this.onAuthComplete(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete = (props) => {
        if(props.user) {
            this.props.navigation.navigate('addDevice');
        }
    }

    render() {

        const {
            containerStyle,
            bannerContainerStyle,
            buttonContainerStyle,
            buttonStyle
        } = styles;

        const { navigate } = this.props.navigation;

        return(
            <View style={containerStyle}>
                <View style={bannerContainerStyle}>
                    <Banner />
                </View>
                <View style={buttonContainerStyle}>
                    <Button 
                        title="Register"
                        buttonStyle={buttonStyle}
                        onPress={() => { navigate('register') }}
                    />
                    <Button 
                        title="Log In"
                        buttonStyle={buttonStyle}
                        onPress={() => { navigate('login') }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        padding: 6,
        flex: 1
    },
    bannerContainerStyle: {
        marginTop: 20
    },
    buttonContainerStyle: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        padding: 12
    },
    buttonStyle: {
        margin: 3,
        height:70,
        backgroundColor: "#3D6DCC"
    }
});

function mapStateToProps({ auth }) {
    const { user } = auth;
    return { user };
}

export default connect(mapStateToProps, null)(AuthScreen);