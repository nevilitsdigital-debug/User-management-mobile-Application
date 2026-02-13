import React, { useCallback, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import StatusbarContainer from '../../components/statusbar/StatusbarContainer';
import styles from './MusicDetails.styles';
import Header from '../../components/Header/Header';
import YoutubePlayer from 'react-native-youtube-iframe';

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

const MusicDetailsScreen = () => {
  const [playing, setPlaying] = useState(false);
  const route = useRoute();
  const { song } = (route.params as any) || {};

  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  if (!song) {
    return (
      <StatusbarContainer>
        <View style={styles.container}>
          <Header title="Music Details" showBackButton={true} />
        </View>
      </StatusbarContainer>
    );
  }

  return (
    <StatusbarContainer>
      <View style={styles.container}>
        <Header title={song.title || 'Music Details'} showBackButton={true} />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.playerContainer}>
            <YoutubePlayer height={250} play={true} videoId={song.videoId} onStateChange={onStateChange} />
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Artist:</Text>
              <Text style={styles.detailValue}>{song.artist || 'N/A'}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Album:</Text>
              <Text style={styles.detailValue}>{song.album || 'N/A'}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Duration:</Text>
              <Text style={styles.detailValue}>{song.duration || 'N/A'}</Text>
            </View>

            {song.year && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Year:</Text>
                <Text style={styles.detailValue}>{song.year}</Text>
              </View>
            )}

            {song.views && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Views:</Text>
                <Text style={styles.detailValue}>{song.views}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </StatusbarContainer>
  );
};

export default MusicDetailsScreen;