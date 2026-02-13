import { StyleSheet } from 'react-native';
import Colors from '../../utils/colors';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils/responsiveSize';

const styles = StyleSheet.create({
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
});

export default styles;

