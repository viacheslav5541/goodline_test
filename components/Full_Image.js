import React, { Component } from 'react';
import {
    Image,
    View,
} from 'react-native';

export default class Full_Image extends Component{
    render(){
        const {params} = this.props.navigation.state;
        return <View style = {{flex:1}}>
            <Image style = {{flex:1}} source = {{uri:params.url}}/>
        </View>
    }
}



