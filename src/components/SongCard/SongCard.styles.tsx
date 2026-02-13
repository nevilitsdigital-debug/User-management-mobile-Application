import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils/responsiveSize';

const styles = StyleSheet.create({
  songItem: {
    flexDirection: 'row',
    marginBottom: verticalScale(16),
    backgroundColor: '#F9F9F9',
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbnail: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    marginRight: horizontalScale(12),
  },
  songInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  songTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: verticalScale(4),
  },
  songArtist: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: colors.primary,
    marginBottom: verticalScale(2),
  },
  songAlbum: {
    fontSize: moderateScale(12),
    color: '#666',
    marginBottom: verticalScale(2),
  },
  songDuration: {
    fontSize: moderateScale(12),
    color: '#999',
  },
});

export default styles;

