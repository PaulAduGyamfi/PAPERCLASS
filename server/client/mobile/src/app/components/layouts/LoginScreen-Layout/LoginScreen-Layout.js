import React from 'react';
import {View, Text} from 'react-native';
import LoginButton from '../../modules/LoginButton/LoginButton';
import styles from './LoginScreen-Layout.styles';

const LoginScreenLayout = () => {
  //<LoginButton />
  return (
    <View style={styles.loginScreenLayoutContainer}>
      <View style={styles.loginScreenLayoutTopConatainer}>
        <Text>Hi</Text>
      </View>
      <View style={styles.loginScreenLayoutBottomContainer}>
        <LoginButton />
      </View>
    </View>
  );
};

export default LoginScreenLayout;
