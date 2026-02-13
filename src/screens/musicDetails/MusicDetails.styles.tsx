import { StyleSheet } from 'react-native';
import Colors from '../../utils/colors';
import {
  horizontalScale,
  verticalScale,
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
    paddingVertical: verticalScale(16),
  },
  playerContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: verticalScale(24),
  },
  detailsContainer: {
    marginTop: verticalScale(8),
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    width: horizontalScale(100),
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    flex: 1,
  },
});

export default styles;
