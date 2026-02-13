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
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: verticalScale(24),
  },
  // Profile Header
  profileHeader: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingVertical: verticalScale(32),
    paddingHorizontal: horizontalScale(20),
    marginBottom: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    marginBottom: verticalScale(16),
  },
  avatar: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  avatarText: {
    fontSize: moderateScale(36),
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 1,
  },
  userName: {
    fontSize: moderateScale(28),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  userEmail: {
    fontSize: moderateScale(16),
    color: '#666666',
    marginBottom: verticalScale(12),
    textAlign: 'center',
  },
  roleBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(20),
  },
  roleText: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: Colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Section Styles
  section: {
    backgroundColor: Colors.white,
    marginHorizontal: horizontalScale(16),
    marginBottom: verticalScale(16),
    borderRadius: moderateScale(16),
    padding: horizontalScale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: verticalScale(16),
    paddingBottom: verticalScale(12),
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#666666',
    flex: 1,
    marginRight: horizontalScale(12),
  },
  detailValue: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: '#1A1A1A',
    flex: 2,
    textAlign: 'right',
    flexWrap: 'wrap',
  },
  // Empty State
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
});

export default styles;
