import React from 'react';
import {View, Text} from 'react-native';
import LoginButton from '../../modules/LoginButton/LoginButton';
import styles from './LoginScreen-Layout.styles';

const LoginScreenLayout = () => {
  //<LoginButton />
  return (
    <View style={styles.loginScreenLayoutContainer}>
      <View style={styles.loginScreenLayoutTopConatainer}>
        <Text>[ Logo Here ]</Text>
      </View>
      <View style={styles.loginScreenLayoutBottomContainer}>
        <View style={styles.loginScreenLayoutBottomModalContainer}>
          <View style={styles.loginScreenLayoutBottomModalWrapper}>
            <View style={styles.loginScreenLayoutBottomModalHeader}>
              <Text style={styles.loginScreenLayoutBottomModalHeaderTitle}>
                Welcome to Brand Name
              </Text>
              <Text style={styles.loginScreenLayoutBottomModalHeaderSubtitle}>
                Get started with your account
              </Text>
            </View>
            <LoginButton />
            <Text style={styles.loginScreenLayoutBottomModalFooter}>
              By signing up you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreenLayout;
