import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './Header.styles';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  showAddUserButton?: boolean;
  onAddUserPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  rightComponent,
  showAddUserButton = false,
  onAddUserPress,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <Image
              source={require('../../assets/BackButton.png')}
              style={styles.backButtonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
        {showAddUserButton && (
          <TouchableOpacity
            style={styles.addUserButton}
            onPress={onAddUserPress}
            activeOpacity={0.8}
          >
            <Text style={styles.addUserButtonText}>Add user</Text>
          </TouchableOpacity>
        )}
        {rightComponent && !showAddUserButton && (
          <View style={styles.rightContainer}>{rightComponent}</View>
        )}
      </View>
    </View>
  );
};

export default Header;
