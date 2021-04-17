import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loginScreenLayoutContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: 850,
    paddingTop: 50,
    overflow: 'hidden',
    backgroundColor: 'red',
  },

  loginScreenLayoutTopConatainer: {
    alignItems: 'center',
    backgroundColor: 'lime',
    minHeight: '50%',
    width: '100%',
  },

  loginScreenLayoutBottomContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: '#f0fc',
  },
});

export default styles;
