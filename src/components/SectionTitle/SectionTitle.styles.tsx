import { StyleSheet } from 'react-native';
import {
  verticalScale,
  moderateScale,
} from '../../utils/responsiveSize';

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: verticalScale(16),
  },
});

export default styles;

