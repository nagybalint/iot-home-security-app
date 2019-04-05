import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { Button, Header } from 'react-native-elements';

import DeviceStatus from '../components/DeviceStatus';

class DeviceStatusScreen extends Component {
    render() {
        return(
            <View style={styles.containerStyle}>
                <Header 
                    centerComponent={{
                        text: "DEVICE STATUS",
                        style: styles.centerComponentStyle
                    }}
                    rightComponent={{ 
                        icon: 'sync', 
                        color: '#fff' 
                    }}
                    statusBarProps={{translucent: true}}
                    containerStyle={{
                        backgroundColor: "#3D6DCC"
                    }}
                />
                <DeviceStatus 
                    timestamp={"2019.04.04 19:32"}
                    image={"https://cdn0.wideopenpets.com/wp-content/uploads/2015/12/2402137164_ed05e6c2e7_z.jpg"}
                    motionStatus={false}
                />
            </View>
        );
    }
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

export default DeviceStatusScreen;
