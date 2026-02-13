import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import styles from './ListCard.styles';

interface ListCardProps {
  item: {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    image?: string;
  };
  onUserDetailsPress: () => void;
  onEditPress: () => void;
  onDeletePress: () => void;
}

const ListCard: React.FC<ListCardProps> = ({
  item,
  onUserDetailsPress,
  onEditPress,
  onDeletePress,
}) => {
  // Get user initials for avatar
  const getInitials = (firstName: string, lastName: string) => {
    const first = firstName?.charAt(0)?.toUpperCase() || '';
    const last = lastName?.charAt(0)?.toUpperCase() || '';
    return `${first}${last}`;
  };

  const initials = getInitials(item.firstName || '', item.lastName || '');

  return (
    <View style={styles.userItem}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.userContentTouchable}
        onPress={onUserDetailsPress}
      >
        <View style={styles.userContent}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.avatarText}>{initials}</Text>
              )}
            </View>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.userEmail}>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.editButton,
            pressed && { opacity: 0.8 },
          ]}
          onPress={onEditPress}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.deleteButton,
            pressed && { opacity: 0.8 },
          ]}
          onPress={onDeletePress}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ListCard;

