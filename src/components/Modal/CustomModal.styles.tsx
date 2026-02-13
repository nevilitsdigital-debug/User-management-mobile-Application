import { StyleSheet } from 'react-native';
import Colors from '../../utils/colors';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils/responsiveSize';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(20),
  },
  modalContainer: {
    width: '100%',
    maxWidth: horizontalScale(400),
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(20),
    padding: horizontalScale(24),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    marginBottom: verticalScale(12),
    alignItems: 'center',
  },
  modalIconContainer: {
    marginBottom: verticalScale(16),
  },
  modalIcon: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(32),
    backgroundColor: '#FFE5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalIconText: {
    fontSize: moderateScale(36),
    fontWeight: '700',
    color: '#FF4757',
  },
  modalTitle: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: moderateScale(16),
    color: '#666666',
    textAlign: 'center',
    lineHeight: moderateScale(24),
    marginBottom: verticalScale(24),
    paddingHorizontal: horizontalScale(8),
  },
  modalBody: {
    width: '100%',
    marginBottom: verticalScale(24),
  },
  modalButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: horizontalScale(12),
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: verticalScale(50),
  },
  modalCancelButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#666666',
    letterSpacing: 0.5,
  },
  modalConfirmButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
  },
});

export default styles;

