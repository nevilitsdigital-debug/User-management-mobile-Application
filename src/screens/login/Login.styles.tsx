import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils/responsiveSize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(40),
  },
  contentContainer: {
    width: '100%',
  },
  title: {
    fontSize: moderateScale(32),
    fontWeight: '700',
    color: colors.black,
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: colors.gray,
    marginBottom: verticalScale(40),
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: verticalScale(20),
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: colors.black,
    marginBottom: verticalScale(8),
  },
  input: {
    height: verticalScale(50),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: moderateScale(12),
    paddingHorizontal: horizontalScale(16),
    fontSize: moderateScale(16),
    color: colors.black,
    backgroundColor: '#FAFAFA',
  },
  inputError: {
    borderColor: '#EF5350',
    borderWidth: 1.5,
  },
  errorText: {
    fontSize: moderateScale(12),
    color: '#EF5350',
    marginTop: verticalScale(4),
    marginLeft: horizontalScale(4),
  },
  placeholder: {
    color: '#9E9E9E',
  },
  loginButton: {
    height: verticalScale(50),
    backgroundColor: colors.primary,
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginButtonText: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: colors.white,
  },
  credentialsNote: {
    marginTop: verticalScale(24),
    padding: horizontalScale(16),
    backgroundColor: '#FFEBEE',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: '#EF5350',
  },
  credentialsText: {
    fontSize: moderateScale(12),
    color: '#D32F2F',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: moderateScale(18),
  },
});

export default styles;