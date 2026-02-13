import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import StatusbarContainer from '../../components/statusbar/StatusbarContainer';
import Header from '../../components/Header/Header';
import DetailsCard from '../../components/DetailsCard/DetailsCard';
import { makeAuthenticatedGetRequest } from '../../config/axios';
import Loader from '../../components/loader/Loader';
import styles from './userDetails.styles';

const UserDetailsScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { userId } = (route.params as any) || {};
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getUserDetails = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const url = `users/${userId}`;
      const result = await dispatch(makeAuthenticatedGetRequest(url) as any);

      if (result?.type === 'success' && result?.data) {
        setUserDetails(result.data);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [userId]);

  const getInitials = (firstName: string, lastName: string) => {
    const first = firstName?.charAt(0)?.toUpperCase() || '';
    const last = lastName?.charAt(0)?.toUpperCase() || '';
    return `${first}${last}`;
  };

  const renderDetailRow = (label: string, value: any) => {
    if (value === null || value === undefined || value === '') return null;
    
    return (
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>
          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
        </Text>
      </View>
    );
  };


  return (
    <StatusbarContainer>
      <View style={styles.container}>
        <Header title="User Details" showBackButton={true} />
        {
          loading ? <Loader fullScreen={false} /> :
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {!userDetails ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>User not found</Text>
              </View>
            ) : (
              <>
                {/* Profile Header */}
                {(() => {
                  const initials = getInitials(
                    userDetails.firstName || '',
                    userDetails.lastName || ''
                  );
                  return (
                    <View style={styles.profileHeader}>
                      <View style={styles.avatarContainer}>
                        {userDetails.image ? (
                          <Image
                            source={{ uri: userDetails.image }}
                            style={styles.avatarImage}
                            resizeMode="cover"
                          />
                        ) : (
                          <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{initials}</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.userName}>
                        {userDetails.firstName} {userDetails.lastName}
                      </Text>
                      {userDetails.email && (
                        <Text style={styles.userEmail}>{userDetails.email}</Text>
                      )}
                      {userDetails.role && (
                        <View style={styles.roleBadge}>
                          <Text style={styles.roleText}>{userDetails.role}</Text>
                        </View>
                      )}
                    </View>
                  );
                })()}

                {/* Basic Information */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Basic Information</Text>
                  {renderDetailRow('First Name', userDetails.firstName)}
                  {renderDetailRow('Last Name', userDetails.lastName)}
                  {renderDetailRow('Maiden Name', userDetails.maidenName)}
                  {renderDetailRow('Age', userDetails.age)}
                  {renderDetailRow('Gender', userDetails.gender)}
                  {renderDetailRow('Birth Date', userDetails.birthDate)}
                  {renderDetailRow('Username', userDetails.username)}
                  {renderDetailRow('Phone', userDetails.phone)}
                  {renderDetailRow('Blood Group', userDetails.bloodGroup)}
                  {renderDetailRow('Height', userDetails.height ? `${userDetails.height} cm` : null)}
                  {renderDetailRow('Weight', userDetails.weight ? `${userDetails.weight} kg` : null)}
                  {renderDetailRow('Eye Color', userDetails.eyeColor)}
                </View>

                {/* Hair Information */}
                {userDetails.hair && (
                  <DetailsCard title="Hair" data={userDetails.hair} />
                )}

                {/* Address Information */}
                {userDetails.address && (
                  <DetailsCard title="Address" data={userDetails.address} />
                )}

                {/* Company Information */}
                {userDetails.company && (
                  <DetailsCard title="Company" data={userDetails.company} />
                )}

                {/* Bank Information */}
                {userDetails.bank && (
                  <DetailsCard title="Bank" data={userDetails.bank} />
                )}

                {/* Additional Information */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Additional Information</Text>
                  {renderDetailRow('IP Address', userDetails.ip)}
                  {renderDetailRow('MAC Address', userDetails.macAddress)}
                  {renderDetailRow('University', userDetails.university)}
                  {renderDetailRow('EIN', userDetails.ein)}
                  {renderDetailRow('SSN', userDetails.ssn)}
                  {renderDetailRow('User Agent', userDetails.userAgent)}
                </View>

                {/* Crypto Information */}
                {userDetails.crypto && (
                  <DetailsCard title="Crypto" data={userDetails.crypto} />
                )}
              </>
            )}
          </ScrollView>
        }
      </View>
    </StatusbarContainer>
  );
};

export default UserDetailsScreen;
