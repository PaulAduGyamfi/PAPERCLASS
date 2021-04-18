import React from 'react';
import {View, Text, Alert} from 'react-native';
import Button from '../../elements/Button';
import {Linking} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import styles from './LoginButton.styles';

const LoginButton = () => {
  const login = async () => {
    try {
      const url = 'http://paperclass.com/api/user/auth/google';
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(url).then(response => {
          if (response.type === 'success' && response.url) {
            Linking.openURL(response.url);
          }
        });
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const innerButton = () => {
    return (
      <View>
        <View>
          <Text>Sign in with Google</Text>
        </View>
      </View>
    );
  };

  return (
    <Button
      buttonText={innerButton()}
      buttonFunction={login}
      style={styles.loginButton}
    />
  );
};

export default LoginButton;
