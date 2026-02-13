import { StyleSheet } from 'react-native';
import Colors from '../../utils/colors';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils/responsiveSize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(100),
  },
  section: {
    marginBottom: verticalScale(24),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: verticalScale(16),
  },
  inputFieldContainer: {
    marginBottom: verticalScale(16),
  },
  inputLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#333333',
    marginBottom: verticalScale(8),
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: moderateScale(12),
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(14),
    fontSize: moderateScale(16),
    color: '#1A1A1A',
    backgroundColor: Colors.white,
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
  submitButtonContainer: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(40),
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  fixedSubmitButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: horizontalScale(16),
    paddingBottom: verticalScale(20),
    paddingTop: verticalScale(12),
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default styles;