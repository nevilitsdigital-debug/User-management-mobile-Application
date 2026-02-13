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
  listContent: {
    paddingHorizontal: horizontalScale(12),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(24),
  },
  userItem: {
    backgroundColor: Colors.white,
    padding: horizontalScale(20),
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(16),
    marginHorizontal: horizontalScale(4),
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  userContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  userContentTouchable: {
    flex: 1,
  },
  avatarContainer: {
    marginRight: horizontalScale(16),
  },
  avatar: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(28),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: verticalScale(6),
    letterSpacing: 0.3,
  },
  userEmail: {
    fontSize: moderateScale(14),
    color: '#666666',
    fontWeight: '400',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: verticalScale(16),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: horizontalScale(12),
  },
  button: {
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(8),
    minWidth: horizontalScale(80),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  editButton: {
    backgroundColor: Colors.primary,
  },
  editButtonText: {
    color: Colors.white,
    fontSize: moderateScale(14),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  deleteButton: {
    backgroundColor: '#FF4757',
  },
  deleteButtonText: {
    color: Colors.white,
    fontSize: moderateScale(14),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  footerLoader: {
    paddingVertical: verticalScale(20),
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(40),
  },
  emptyText: {
    fontSize: moderateScale(16),
    color: Colors.gray,
  },
  // Modal Styles
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
    marginBottom: verticalScale(12),
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
  modalCancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modalCancelButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#666666',
    letterSpacing: 0.5,
  },
  modalConfirmButton: {
    backgroundColor: '#FF4757',
    shadowColor: '#FF4757',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  modalConfirmButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  // Edit Modal Styles
  editModalContent: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(20),
    padding: horizontalScale(24),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  editModalHeader: {
    marginBottom: verticalScale(24),
    alignItems: 'center',
  },
  editModalTitle: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#1A1A1A',
  },
  editModalBody: {
    marginBottom: verticalScale(24),
  },
  inputFieldContainer: {
    marginBottom: verticalScale(20),
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
  inputFieldDisabled: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: moderateScale(12),
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(14),
    backgroundColor: '#F5F5F5',
  },
  inputFieldDisabledText: {
    fontSize: moderateScale(16),
    color: '#666666',
  },
  editModalButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: horizontalScale(12),
    justifyContent: 'space-between',
  },
  editModalButton: {
    flex: 1,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: verticalScale(50),
  },
  editModalCancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  editModalCancelButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#666666',
    letterSpacing: 0.5,
  },
  editModalUpdateButton: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  editModalUpdateButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  editModalButtonDisabled: {
    backgroundColor: '#CCCCCC',
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default styles;