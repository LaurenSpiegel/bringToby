'use strict';
import {
  AppRegistry,
  Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';
import React, { Component } from 'react';

import Signup from './src/pages/signup';
import Account from './src/pages/account';
import Login from './src/pages/login';

import Header from './src/components/header';

import * as firebase from './src/firebase/firebase';

import styles from './src/styles/common-styles.js';

class toby extends Component {

  constructor(props){
    super(props);
    this.state = {
      component: null,
      loaded: false
    };
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged((user) => {

      let component = user ? "Account" : "Signup";

      this.setState({
        loaded: false,
        component,
      });
    });
  }

  render(){

    if(this.state.component){
      return (
        <Navigator
          // default component to render
          initialRoute={{component: this.state.component}}
          // configureScene is optional and specifies animation for navigation
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          // renderScene takes the function that will actually render the
          // component
          renderScene={(route, navigator) => {
            if(route.component){
              switch (route.component) {
                case "Account":
                  return (<Account navigator={navigator} />);
                  break;
                case "Signup":
                  return (<Signup navigator={navigator} />);
                  break;
                case "Login":
                  return (<Login navigator={navigator} />);
                  break;
              }
            }
          }}
        />
      );
    }else{
      return (
        <View style={styles.container}>
          <Header text="Woofio" loaded={this.state.loaded} />
          <View style={styles.body}></View>
        </View>
      );
    }

  }

}

AppRegistry.registerComponent('toby', () => toby);
