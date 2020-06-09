
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    NativeAppEventEmitter,
    NativeEventEmitter,
    NativeModules,
    Platform,
    PermissionsAndroid,
    ScrollView,
    AppState,
    FlatList,
    Dimensions,
    Button
} from 'react-native';


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View></View>
        );
    }
}