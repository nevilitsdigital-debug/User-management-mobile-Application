import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import StatusbarContainer from '../../components/statusbar/StatusbarContainer';
import Header from '../../components/Header/Header';
import Loader from '../../components/loader/Loader';
import SongCard from '../../components/SongCard/SongCard';
import colors from '../../utils/colors';
import { showError } from '../../messageHelper/Helper';
import { setSongList } from '../../slices/userSlice';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils/responsiveSize';
import { useNavigation } from '@react-navigation/native';

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

interface SongListResponse {
  query: string;
  type: string;
  count: number;
  results: Song[];
}

const MusicScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const songs = useSelector((state: any) => state.user.songList || []);
  const [searchQuery, setSearchQuery] = useState('aashiq');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const getSongList = useCallback(async (query: string) => {
    if (!query.trim()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get<SongListResponse>(
        `https://ytm-api.vrma.dev/search?q=${encodeURIComponent(query)}&type=songs`
      );

      if (response.data && response.data.results) {
        console.log("response.data.results", response.data.results);
        // Store data in Redux
        dispatch(setSongList(response.data.results));
      } else {
        dispatch(setSongList([]));
        showError('No songs found');
      }
    } catch (error: any) {
      console.error('Error fetching songs:', error);
      showError('Failed to fetch songs. Please try again.');
      dispatch(setSongList([]));
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [dispatch]);

  // Load initial songs with "aashiq" on mount if Redux is empty
  useEffect(() => {
    if (songs.length === 0) {
      getSongList('aashiq');
    } else {
      setInitialLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle search button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      getSongList(searchQuery);
    } else {
      showError('Please enter a search query');
    }
  };

  const renderSongItem = ({ item }: { item: Song }) => {
    const handlePress = () => {
      (navigation as any).navigate('musicDetails', { song: item });
    };

    return <SongCard item={item} onPress={handlePress} />;
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  };

  const renderEmpty = () => {
    if (initialLoading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No songs found</Text>
      </View>
    );
  };

  return (
    <StatusbarContainer>
      <View style={styles.container}>
        <Header title="Music" showBackButton={false} />
        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search songs..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity
            style={[styles.searchButton, loading && styles.searchButtonDisabled]}
            onPress={handleSearch}
            disabled={loading || !searchQuery.trim()}
            activeOpacity={0.7}
          >
            {loading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.searchButtonText}>Search</Text>
            )}
          </TouchableOpacity>
        </View>

        {initialLoading ? (
          <Loader fullScreen={false} />
        ) : (
          <FlatList
            data={songs}
            renderItem={renderSongItem}
            keyExtractor={(item) => item.videoId}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </StatusbarContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    gap: horizontalScale(12),
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: moderateScale(12),
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(16),
    color: '#1A1A1A',
    backgroundColor: '#F5F5F5',
  },
  searchButton: {
    backgroundColor: colors.primary,
    borderRadius: moderateScale(12),
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: moderateScale(80),
  },
  searchButtonDisabled: {
    opacity: 0.6,
  },
  searchButtonText: {
    color: colors.white,
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
  },
  footerLoader: {
    paddingVertical: verticalScale(20),
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(60),
  },
  emptyText: {
    fontSize: moderateScale(16),
    color: '#666',
  },
});

export default MusicScreen;

