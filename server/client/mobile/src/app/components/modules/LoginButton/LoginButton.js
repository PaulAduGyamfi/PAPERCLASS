import React from 'react';
import {View, Text, Alert} from 'react-native';
import Button from '../../elements/Button';
import {Linking} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import Svg, {Path} from 'react-native-svg';
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
          <Svg
            aria-hidden="true"
            className="native svg-icon iconGoogle"
            width="18"
            height="18"
            viewBox="0 0 18 18">
            <Path
              d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"
              fill="#4285F4"
            />
            <Path
              d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"
              fill="#34A853"
            />
            <Path
              d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"
              fill="#FBBC05"
            />
            <Path
              d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z"
              fill="#EA4335"
            />
          </Svg>
        </View>
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
