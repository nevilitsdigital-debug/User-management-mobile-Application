import { StyleSheet } from 'react-native';
import Colors from '../../utils/colors';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils/responsiveSize';

const styles = StyleSheet.create({
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
    marginRight: horizontalScale(8),
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
    marginRight: 0,
  },
  deleteButtonText: {
    color: Colors.white,
    fontSize: moderateScale(14),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default styles;

