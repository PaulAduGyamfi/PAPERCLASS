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
    backgroundColor: '#AA26DA',
  },

  loginScreenLayoutTopConatainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AA26DA',
    minHeight: '50%',
    width: '100%',
  },

  loginScreenLayoutBottomContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: '#AA26DA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginScreenLayoutBottomModalContainer: {
    width: '95%',
    height: 330,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginBottom: 35,
  },

  loginScreenLayoutBottomModalWrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
  },

  loginScreenLayoutBottomModalHeader: {
    alignItems: 'center',
    paddingBottom: 30,
  },

  loginScreenLayoutBottomModalHeaderTitle: {
    fontFamily: 'ProximaNova-Bold',
    fontSize: 24,
    marginBottom: 20,
  },

  loginScreenLayoutBottomModalFooter: {
    textAlign: 'center',
    fontFamily: 'ProximaNova-Regular',
    fontSize: 12,
    paddingHorizontal: 25,
    lineHeight: 18,
    paddingTop: 50,
  },
});

export default styles;
