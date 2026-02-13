import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils/responsiveSize';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(16),
    paddingHorizontal: horizontalScale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: horizontalScale(40),
    height: verticalScale(40),
    borderRadius: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: horizontalScale(12),
    elevation: 2,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButtonImage: {
    width: moderateScale(35),
    height: moderateScale(35),
    tintColor: colors.white,
  },
  title: {
    flex: 1,
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: colors.white,
    textAlign: 'left',
  },
  rightContainer: {
    marginLeft: horizontalScale(12),
  },
  addUserButton: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: 'transparent',
  },
  addUserButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: colors.white,
    letterSpacing: 0.5,
  },
});

export default styles;

