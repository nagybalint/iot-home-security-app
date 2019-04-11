import React from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Platform,
    StyleSheet
} from 'react-native';
import { DrawerItems } from 'react-navigation';
import Banner from './Banner';

const Drawer = (props) => (
    <SafeAreaView style={styles.containerStyle}>
        <View style={styles.bannerContainerStyle}>
            <Banner />
        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    containerStyle: {
        marginTop: Platform.OS === 'ios' ? 0 : 24,
        flex: 1
    },
    bannerContainerStyle: {
        marginTop: 12,
        marginBottom: 12
    }
});

export default Drawer;