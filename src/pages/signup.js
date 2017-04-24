'use strict';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  AsyncStorage
} from 'react-native';
import React, { Component } from 'react';

import Button from '../components/button';
import Header from '../components/header';

import Login from './login';
import Account from './account';

import * as firebase from '../firebase/firebase';
import styles from '../styles/common-styles.js';

export default class signup extends Component {

  constructor(props){
    super(props);

    this.state = {
      // so that spinner does not run before a click event
      loaded: true,
      email: '',
      password: ''
    };
  }

  signup(){

    this.setState({
      loaded: false
    });
    firebase.auth().createUserWithEmailAndPassword(this.state.email,
      this.state.password)
        .then(userData => {
          alert('Your account was created!');
          this.setState({
            email: '',
            password: '',
            loaded: true
          });
          const value = JSON.stringify(userData)
          if (value) AsyncStorage.setItem('user_data', value)
          else console.log('AsyncStorage not set, stringify failed:', key, value)
          this.props.navigator.push({
            component: Account
          });

        }, error => {
          this.setState({
            password: '',
            loaded: true
          })
          if(error.code === 'auth/weak-password'){
            alert('Password is too weak');
          } else if(error.code === 'auth/invalid-email'){
            alert('Invalid email');
          } else if(error.code === 'auth/email-already-in-use'){
            alert('There is already an account with that email address');
          } else {
            alert(error.message);
          }
        });
  }

  goToLogin(){
    console.log('called goToLogin from SignUp')
    this.props.navigator.push({
      component: Login
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="Signup" loaded={this.state.loaded} />
        <View style={styles.body}>

            <TextInput
                style={styles.textinput}
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email}
            placeholder={"Email Address"}
            />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />
          <Button
            text="Signup"
            onpress={this.signup.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

          <Button
            text="Got an Account?"
            onpress={this.goToLogin.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);
