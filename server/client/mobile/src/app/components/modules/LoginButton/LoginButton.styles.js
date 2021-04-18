import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 55,
    backgroundColor: '#EFF0F1',
    borderRadius: 25,
  },

  loginButtonInnerWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginButtonGoogleLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingLeft: 0,
  },

  loginButtonInnerText: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});

export default styles;
