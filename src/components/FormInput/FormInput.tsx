import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import styles from './FormInput.styles';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  touched?: boolean;
  onKeyboardFocus?: () => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  touched,
  style,
  onKeyboardFocus,
  onFocus,
  ...textInputProps
}) => {
  const hasError = touched && error;

  const handleFocus = (e: any) => {
    if (onKeyboardFocus) {
      onKeyboardFocus();
    }
    if (onFocus) {
      onFocus(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...textInputProps}
        style={[styles.input, hasError && styles.inputError, style]}
        placeholderTextColor="#999"
        onFocus={handleFocus}
      />
      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default FormInput;

