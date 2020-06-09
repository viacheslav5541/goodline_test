import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Card_gallery from './Card_gallery'
import Full_Image from './Full_Image'




const MainNavigator = createStackNavigator({
  Card_gallery: {screen: Card_gallery},
  Full_Image:{screen: Full_Image}
});

const App = createAppContainer(MainNavigator);

export default App;







