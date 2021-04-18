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
    justifyContent: 'center',
    backgroundColor: 'lime',
    minHeight: '50%',
    width: '100%',
  },

  loginScreenLayoutBottomContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: '#f0fc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginScreenLayoutBottomModalContainer: {
    width: '95%',
    height: 330,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 35,
  },

  loginScreenLayoutBottomModalWrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  loginScreenLayoutBottomModalHeader: {
    alignItems: 'center',
  },

  loginScreenLayoutBottomModalFooter: {
    textAlign: 'center',
    fontFamily: 'ProximaNova-Bold',
  },
});

export default styles;
