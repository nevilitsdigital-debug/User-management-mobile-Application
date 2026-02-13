import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Text,
} from 'react-native';
import StatusbarContainer from '../../components/statusbar/StatusbarContainer';
import Header from '../../components/Header/Header';
import ListCard from '../../components/ListCard/ListCard';
import { makeAuthenticatedGetRequest, makeAuthenticatedDeleteRequest } from '../../config/axios';
import { setUserList } from '../../slices/userSlice';
import { showSuccess } from '../../messageHelper/Helper';
import CustomModal from '../../components/Modal/CustomModal';
import styles from './UserList.styles';
import Loader from '../../components/loader/Loader';
import colors from '../../utils/colors';

const initialData = {
  data: [],
  totalResult: 0,
  pageNo: 0,
  totalPages: 0,
};

const UserListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const reduxUserList = useSelector((state: any) => state.user.userList || []);
  const [initialLoader, setInitialLoader] = useState(true);
  const [data, setData] = useState<any[]>(initialData.data);
  const [totalResult, setTotalResult] = useState(initialData.totalResult);
  const [pageNo, setPageNo] = useState(initialData.pageNo);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);
  const LIMIT = 10;
  
  // Use refs to avoid stale closures in callbacks
  const dataRef = useRef(data);
  const reduxUserListRef = useRef(reduxUserList);
  
  // Update refs when state changes
  useEffect(() => {
    dataRef.current = data;
  }, [data]);
  
  useEffect(() => {
    reduxUserListRef.current = reduxUserList;
  }, [reduxUserList]);

  // Fetch data for a given page
  const fetchData = useCallback(
    async (page: number, perPage: number = LIMIT) => {
      try {
        const url = `users?limit=${perPage}&skip=${page * perPage}`;
        const result = await dispatch(makeAuthenticatedGetRequest(url) as any);

        if (result?.type === 'success' && result?.data) {
          const resultOld = result.data;
          const formattedResult = {
            data: resultOld?.users || resultOld?.data || [],
            totalResult: resultOld?.total || 0,
            status: true,
            pageNo: page,
            totalPages: Math.ceil((resultOld?.total || 0) / perPage) || 10,
          };

          if (formattedResult.status) {
            // Use functional updates to avoid stale closures
            setData((prevData) =>
              page === 0
                ? formattedResult.data
                : [...prevData, ...formattedResult.data]
            );
            setTotalResult(formattedResult.totalResult);
            setPageNo(formattedResult.pageNo);
            setTotalPages(formattedResult.totalPages);
            
            // Store data in Redux using current ref value
            const currentReduxData = reduxUserListRef.current;
            const reduxData =
              page === 0
                ? formattedResult.data
                : [...currentReduxData, ...formattedResult.data];
            dispatch(setUserList(reduxData));
          } else {
            console.error('Failed to fetch data');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setRefreshing(false);
        setLoadingMore(false);
        setInitialLoader(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pull-to-refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setData([]);
    dispatch(setUserList([])); // Clear Redux data on refresh
    fetchData(0);
  }, [fetchData, dispatch]);

  // Load more data
  const loadMore = useCallback(() => {
    if (!loadingMore && pageNo < totalPages - 1) {
      setLoadingMore(true);
      fetchData(pageNo + 1);
    }
  }, [loadingMore, pageNo, totalPages, fetchData]);

  // Render footer with loading indicator
  const renderFooter = () => {
    // Don't show footer loader during refresh - only show RefreshControl indicator
    if (!loadingMore || refreshing) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  };

  // Handle edit action - navigate to edit screen
  const handleEdit = useCallback((item: any) => {
    (navigation as any).navigate('editUser', { userId: item.id });
  }, [navigation]);

  // Handle delete action - open modal
  const handleDelete = useCallback((item: any) => {
    setSelectedUser(item);
    setDeleteModalVisible(true);
  }, []);

  // Confirm delete action
  const confirmDelete = async () => {
    if (!selectedUser) return;

    setDeleting(true);
    try {
      const url = `users/${selectedUser.id}`;
      const result = await dispatch(makeAuthenticatedDeleteRequest(url) as any);

      if (result?.type === 'success') {
        // Remove user from local state
        const updatedData = data.filter((user: any) => user.id !== selectedUser.id);
        setData(updatedData);

        // Remove user from Redux state
        const updatedReduxData = reduxUserList.filter((user: any) => user.id !== selectedUser.id);
        dispatch(setUserList(updatedReduxData));

        showSuccess('User deleted successfully');
        setDeleteModalVisible(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setDeleting(false);
    }
  };

  // Cancel delete action
  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setSelectedUser(null);
  };

  // Render user item - memoized for performance
  const renderItem = useCallback(({ item }: any) => {
    const handleUserDetails = () => {
      (navigation as any).navigate('userDetails', { userId: item.id });
    };

    const handleEditPress = () => {
      handleEdit(item);
    };

    const handleDeletePress = () => {
      handleDelete(item);
    };

    return (
      <ListCard
        item={item}
        onUserDetailsPress={handleUserDetails}
        onEditPress={handleEditPress}
        onDeletePress={handleDeletePress}
      />
    );
  }, [navigation, handleEdit, handleDelete]);

  const handleAddUser = () => {
    navigation.navigate('addUser' as never);
  }

  return (
    <StatusbarContainer>
      <View style={styles.container}>
        <Header title="User List" showAddUserButton={true} onAddUserPress={handleAddUser} />
        {
          initialLoader ? <Loader fullScreen={false} /> :
          <FlatList
            data={data}
            keyExtractor={(item: any, index: number) =>
              item?.id?.toString() || index.toString()
            }
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
            ListFooterComponent={renderFooter}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No users found</Text>
              </View>
            }
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            initialNumToRender={10}
            windowSize={10}
          />
        }
      </View>

      {/* Delete Confirmation Modal */}
      <CustomModal
        visible={deleteModalVisible}
        onClose={cancelDelete}
        title="Delete User"
        type="delete"
        message={`Are you sure you want to delete ${selectedUser?.firstName} ${selectedUser?.lastName}? This action cannot be undone.`}
        primaryButtonText="Yes"
        secondaryButtonText="No"
        onPrimaryPress={confirmDelete}
        onSecondaryPress={cancelDelete}
        loading={deleting}
      />
    </StatusbarContainer>
  );
};

export default UserListScreen;