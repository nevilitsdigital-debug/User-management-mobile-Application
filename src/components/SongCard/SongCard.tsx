import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './SongCard.styles';

interface Song {
  type: string;
  videoId: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  year: string | null;
  views: string | null;
  thumbnails: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    hq: string;
    max: string;
  };
}

interface SongCardProps {
  item: Song;
  onPress: () => void;
}

const SongCard: React.FC<SongCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.songItem}
      activeOpacity={0.7}
    >
      <Image
        source={require('../../assets/Music.jpg')}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.songArtist} numberOfLines={1}>
          {item.artist}
        </Text>
        <Text style={styles.songAlbum} numberOfLines={1}>
          {item.album}
        </Text>
        <Text style={styles.songDuration}>{item.duration}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SongCard;

