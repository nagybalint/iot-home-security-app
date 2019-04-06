import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

class AuthInput extends Component {
    renderConfirmInput = () => {
        if(!this.props.confirmPassword) {
            return (<View></View>);
        } 

        const {
            inputIconStyle,
            inputContainerStyle,
        } = styles;

        const placeholderText = `Confirm ${this.props.placeholderPassword}`;

        return (
            <Input
                placeholder={placeholderText}
                secureTextEntry={this.props.securePassword}
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                leftIconContainerStyle={inputIconStyle}
                containerStyle={inputContainerStyle}
            />
        );
    }

    onButtonPress = () => {
        
    }

    render() {
        const {
            containerStyle,
            inputIconStyle,
            inputContainerStyle,
            buttonStyle
        } = styles;
        return(
        <View style={containerStyle}>
            <View>
                <Input
                    placeholder={this.props.placeholderUser}
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    leftIconContainerStyle={inputIconStyle}
                    containerStyle={inputContainerStyle}
                />
                <Input
                    placeholder={this.props.placeholderPassword}
                    secureTextEntry={this.props.securePassword}
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    leftIconContainerStyle={inputIconStyle}
                    containerStyle={inputContainerStyle}
                />
                {this.renderConfirmInput()}
            </View>
            <Button 
                title={this.props.submitTitle}
                buttonStyle={buttonStyle}
                onPress={this.onButtonPress}
            />
        </View>
        );
    }
}

AuthInput.defaultProps = {
    confirmPassword: false,
    securePassword: true,
    submitTitle: "Submit",
    placeholderUser: "Username",
    placeholderPassword: "Password",
    submitAction: () => {},
    userRules: (user) => { return true },
    passwordRules: (password) => { return true }
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "stretch"
    },
    inputIconStyle: {
        paddingRight: 6
    },
    inputContainerStyle: {
        marginBottom: 6
    },
    buttonStyle: {
        margin: 3,
        height:70,
        backgroundColor: "#3D6DCC"
    }
    
});

export default AuthInput;