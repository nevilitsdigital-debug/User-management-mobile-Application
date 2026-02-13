import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './CustomModal.styles';
import colors from '../../utils/colors';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  type?: 'delete' | 'edit' | 'custom';
  message?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  primaryButtonColor?: string;
  secondaryButtonColor?: string;
  loading?: boolean;
  primaryButtonDisabled?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  type = 'custom',
  message,
  icon,
  children,
  primaryButtonText = 'Confirm',
  secondaryButtonText = 'Cancel',
  onPrimaryPress,
  onSecondaryPress,
  primaryButtonColor,
  secondaryButtonColor,
  loading = false,
  primaryButtonDisabled = false,
}) => {
  const handleSecondaryPress = () => {
    if (onSecondaryPress) {
      onSecondaryPress();
    } else {
      onClose();
    }
  };

  const getDefaultIcon = () => {
    if (type === 'delete') {
      return (
        <View style={styles.modalIconContainer}>
          <View style={styles.modalIcon}>
            <Text style={styles.modalIconText}>!</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  const getPrimaryButtonColor = () => {
    if (primaryButtonColor) return primaryButtonColor;
    if (type === 'delete') return '#FF4757';
    if (type === 'edit') return colors.primary;
    return colors.primary;
  };

  const getSecondaryButtonColor = () => {
    if (secondaryButtonColor) return secondaryButtonColor;
    return '#F5F5F5';
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Icon */}
            {icon || getDefaultIcon()}

            {/* Title */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
            </View>

            {/* Message or Custom Content */}
            {message && (
              <Text style={styles.modalMessage}>{message}</Text>
            )}
            {children && <View style={styles.modalBody}>{children}</View>}

            {/* Buttons */}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  {
                    backgroundColor: getSecondaryButtonColor(),
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                  },
                ]}
                onPress={handleSecondaryPress}
                disabled={loading}
                activeOpacity={0.7}
              >
                <Text style={styles.modalCancelButtonText}>
                  {secondaryButtonText}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  {
                    backgroundColor: getPrimaryButtonColor(),
                    shadowColor: getPrimaryButtonColor(),
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 4,
                    opacity: primaryButtonDisabled ? 0.6 : 1,
                  },
                ]}
                onPress={onPrimaryPress}
                disabled={loading || primaryButtonDisabled}
                activeOpacity={0.7}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <Text style={styles.modalConfirmButtonText}>
                    {primaryButtonText}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

