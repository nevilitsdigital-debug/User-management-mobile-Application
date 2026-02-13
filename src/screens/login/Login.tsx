import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { makeAuthenticatedPostRequest } from '../../config/axios';
import { setAccessToken } from '../../slices/userSlice';
import { showError, showSuccess } from '../../messageHelper/Helper';
import Loader from '../../components/loader/Loader';
import StatusbarContainer from '../../components/statusbar/StatusbarContainer';
import styles from './Login.styles';
import { useNavigation } from '@react-navigation/native';
import { loginValidationSchema } from '../../utils/ValidationSchema';

// Fixed login credentials
const FIXED_USERNAME = 'emilys';
const FIXED_PASSWORD = 'emilyspass';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: { username: string; password: string }) => {
    // Validate against fixed credentials
    if (values.username.trim() !== FIXED_USERNAME) {
      showError('Enter wrong username. Please use: emilys');
      return;
    }
    if (values.password.trim() !== FIXED_PASSWORD) {
      showError('Enter wrong password. Please use: emilyspass');
      return;
    }

    setLoading(true);
    const params = {
      username: values.username.trim(),
      password: values.password.trim(),
    };

    try {
      const response = await dispatch(
        makeAuthenticatedPostRequest('/auth/login', params) as any
      );

      setLoading(false);
      if (response?.data) {
        dispatch(setAccessToken(response.data.accessToken));
        console.log('Login API response', response.data);
        showSuccess('Login successful!');
        navigation.navigate('MainTabs' as never);
      } else {
        showError('Invalid response from server');
      }
    } catch (error: any) {
      setLoading(false);
      console.error('Error in login API ', error);
      // Error message is already shown by makeAuthenticatedPostRequest
    }
  };

  if (loading) {
    return (
      <StatusbarContainer barStyle="dark-content">
        <Loader />
      </StatusbarContainer>
    );
  }

  return (
    <StatusbarContainer barStyle="dark-content">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.contentContainer}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Username</Text>
                  <TextInput
                    style={[
                      styles.input,
                      touched.username && errors.username && styles.inputError,
                    ]}
                    placeholder="Enter your username"
                    placeholderTextColor={styles.placeholder.color}
                    value={values.username}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {touched.username && errors.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={[
                      styles.input,
                      touched.password && errors.password && styles.inputError,
                    ]}
                    placeholder="Enter your password"
                    placeholderTextColor={styles.placeholder.color}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => handleSubmit()}
                  activeOpacity={0.8}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.credentialsNote}>
                  <Text style={styles.credentialsText}>
                    Username: {FIXED_USERNAME}{'\n'}Password: {FIXED_PASSWORD}
                  </Text>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </StatusbarContainer>
  );
};

export default LoginScreen;