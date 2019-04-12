import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

class AuthInput extends Component {
    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            password: null,
            confirm: null,
            error: null,
            in_progress: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

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
                errorStyle={styles.errorStyle}
                errorMessage={this.getErrorMessage('confirm')}
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                leftIconContainerStyle={inputIconStyle}
                containerStyle={inputContainerStyle}
                onChangeText={ (confirm) => { this.setState({ confirm, error: null }) } }
            />
        );
    }

    validateInputs = () => {
        const { user, password, confirm } = this.state;

        if(!user) {
            this.setState({ error: { type: 'user', message: 'Required'}});
            return false;
        }

        if(!password) {
            this.setState({ error: { type: 'password', message: 'Required'}});
            return false;
        }

        if(!this.props.userRules.checker(user)) {
            this.setState({ error: { type: 'user', message: this.props.userRules.message}});
            return false;
        }

        if(!this.props.passwordRules.checker(password)) {
            this.setState({ error: { type: 'password', message: this.props.passwordRules.message}});
            return false;
        }

        if(this.props.confirmPassword) {
            if(!confirm || (password != confirm)) {
                this.setState({ error: { type: 'confirm', message: `Does Not Match ${this.props.placeholderPassword} Above`}});
                return false;
            }
        }

        return true;
    }

    getErrorMessage = (type) => {
        const { error } = this.state;
        if(!error) {
            return "";
        }

        if(error.type !== type) {
            return "";
        }

        return error.message;
    }

    onSubmitPress = async () => {
        if(this.props.in_progress) {
            return;
        }

        if(!this.validateInputs()) {
            return;
        }

        this.setState({ in_progress: true });
        try {
            await this.props.submitAction(this.state.user, this.state.password);
            if(this._isMounted) {
                this.setState({ in_progress: false });
            }
        } catch (error) {
            console.log(error);
        }

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
                    errorStyle={styles.errorStyle}
                    errorMessage={this.getErrorMessage('user')}
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    leftIconContainerStyle={inputIconStyle}
                    containerStyle={inputContainerStyle}
                    onChangeText={ (user) => this.setState({ user, error: null }) }
                />
                <Input
                    placeholder={this.props.placeholderPassword}
                    secureTextEntry={this.props.securePassword}
                    errorStyle={styles.errorStyle}
                    errorMessage={this.getErrorMessage('password')}
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    leftIconContainerStyle={inputIconStyle}
                    containerStyle={inputContainerStyle}
                    onChangeText={ (password) => { this.setState({ password, error: null }) } }
                />
                {this.renderConfirmInput()}
            </View>
            <Button 
                title={this.props.submitTitle}
                buttonStyle={buttonStyle}
                onPress={this.onSubmitPress}
                loading={this.state.in_progress}
                disabled={this.state.in_progress}
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
    submitAction: async function(user, password) {},
    userRules: {
        checker: (user) => { return true },
        message: 'Please enter a valid Username'
    },
    passwordRules: {
        checker: (password) => { return true },
        message: 'Please enter a valid Password'
    }
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
    }, 
    errorStyle: {
        color: 'red'
    }
    
});

export default AuthInput;