import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import { Formik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import StatusbarContainer from '../../components/statusbar/StatusbarContainer';
import Header from '../../components/Header/Header';
import FormInput from '../../components/FormInput/FormInput';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { makeAuthenticatedGetRequest, makeAuthenticatedPatchRequest } from '../../config/axios';
import { showSuccess, showError } from '../../messageHelper/Helper';
import { addUserValidationSchema } from '../../utils/ValidationSchema';
import Loader from '../../components/loader/Loader';
import styles from './editUser.styles';
import colors from '../../utils/colors';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  username: string;
  password: string;
  birthDate: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  university: string;
  companyName: string;
  companyTitle: string;
}

const EditUserScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { userId } = (route.params as any) || {};
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [initialValues, setInitialValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    username: '',
    password: '',
    birthDate: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    university: '',
    companyName: '',
    companyTitle: '',
  });

  // Fetch user data and populate form
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setFetchingUser(false);
        showError('User ID is required');
        return;
      }

      try {
        setFetchingUser(true);
        const url = `users/${userId}`;
        const result = await dispatch(makeAuthenticatedGetRequest(url) as any);

        if (result?.type === 'success' && result?.data) {
          const userData = result.data;
          setInitialValues({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            phone: userData.phone || '',
            age: userData.age ? String(userData.age) : '',
            gender: userData.gender || '',
            username: userData.username || '',
            password: '', // Don't populate password for security
            birthDate: userData.birthDate || '',
            address: userData.address?.address || '',
            city: userData.address?.city || '',
            state: userData.address?.state || '',
            postalCode: userData.address?.postalCode || '',
            country: userData.address?.country || '',
            university: userData.university || '',
            companyName: userData.company?.name || '',
            companyTitle: userData.company?.title || '',
          });
        } else {
          showError('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        showError('Error loading user data');
      } finally {
        setFetchingUser(false);
      }
    };

    fetchUserData();
  }, [userId, dispatch]);

  const handleUpdate = async (values: FormValues) => {
    setLoading(true);
    try {
      const updateData: any = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
      };

      // Add optional fields only if they have values
      if (values.age) {
        updateData.age = parseInt(values.age);
      }
      if (values.gender) {
        updateData.gender = values.gender.trim();
      }
      if (values.username) {
        updateData.username = values.username.trim();
      }
      if (values.password) {
        updateData.password = values.password.trim();
      }
      if (values.birthDate) {
        updateData.birthDate = values.birthDate.trim();
      }

      // Address object
      updateData.address = {
        address: values.address.trim() || '',
        city: values.city.trim() || '',
        state: values.state.trim() || '',
        postalCode: values.postalCode.trim() || '',
        country: values.country.trim() || '',
      };

      // Company object
      if (values.companyName || values.companyTitle) {
        updateData.company = {};
        if (values.companyName) {
          updateData.company.name = values.companyName.trim();
        }
        if (values.companyTitle) {
          updateData.company.title = values.companyTitle.trim();
        }
      }

      if (values.university) {
        updateData.university = values.university.trim();
      }

      const url = `users/${userId}`;
      const result = await dispatch(
        makeAuthenticatedPatchRequest(url, updateData) as any
      );

      if (result?.type === 'success') {
        showSuccess('User updated successfully');
        // Small delay to ensure API completes before navigation
        setTimeout(() => {
          navigation.goBack();
        }, 100);
      } else {
        showError('Failed to update user. Please try again.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      showError('Error updating user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingUser) {
    return (
      <StatusbarContainer>
        <View style={styles.container}>
          <Header title="Edit User" showBackButton={true} />
          <Loader fullScreen={false} />
        </View>
      </StatusbarContainer>
    );
  }

  return (
    <StatusbarContainer>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <Header title="Edit User" showBackButton={true} />
        <Formik
          initialValues={initialValues}
          validationSchema={addUserValidationSchema}
          onSubmit={handleUpdate}
          enableReinitialize={true}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldTouched,
          }) => (
            <>
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                onScrollBeginDrag={() => setKeyboardVisible(false)}
              >
                {/* Personal Information */}
                <View style={styles.section}>
                  <SectionTitle title="Personal Information" />
                  
                  <FormInput
                    label="First Name *"
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={() => {
                      handleBlur('firstName');
                      setFieldTouched('firstName', true);
                    }}
                    placeholder="Enter first name"
                    autoCapitalize="words"
                    error={errors.firstName}
                    touched={touched.firstName}
                    onKeyboardFocus={() => setKeyboardVisible(true)}
                  />

                  <FormInput
                    label="Last Name *"
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={() => {
                      handleBlur('lastName');
                      setFieldTouched('lastName', true);
                    }}
                    placeholder="Enter last name"
                    autoCapitalize="words"
                    error={errors.lastName}
                    touched={touched.lastName}
                    onKeyboardFocus={() => setKeyboardVisible(true)}
                  />

                  <FormInput
                    label="Email *"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => {
                      handleBlur('email');
                      setFieldTouched('email', true);
                    }}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.email}
                    touched={touched.email}
                    onKeyboardFocus={() => setKeyboardVisible(true)}
                  />

                  <FormInput
                    label="Phone *"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={() => {
                      handleBlur('phone');
                      setFieldTouched('phone', true);
                    }}
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    error={errors.phone}
                    touched={touched.phone}
                    onKeyboardFocus={() => setKeyboardVisible(true)}
                  />

                  <FormInput
                    label="Age"
                    value={values.age}
                    onChangeText={handleChange('age')}
                    onBlur={() => {
                      handleBlur('age');
                      setFieldTouched('age', true);
                    }}
                    placeholder="Enter age"
                    keyboardType="number-pad"
                    error={errors.age}
                    touched={touched.age}
                    onKeyboardFocus={() => setKeyboardVisible(true)}
                  />

                  <FormInput
                    label="Gender"
                    value={values.gender}
                    onChangeText={handleChange('gender')}
                    onBlur={() => {
                      handleBlur('gender');
                      setFieldTouched('gender', true);
                    }}
                    placeholder="Enter gender (male/female/other)"
                    autoCapitalize="words"
                    error={errors.gender}
                    touched={touched.gender}
                    onKeyboardFocus={() => setKeyboardVisible(true)}
                  />

                  <FormInput
                    label="Birth Date"
                    value={values.birthDate}
                    onChangeText={handleChange('birthDate')}
                    onBlur={() => {
                      handleBlur('birthDate');
                      setFieldTouched('birthDate', true);
                    }}
                    placeholder="YYYY-MM-DD"
                    error={errors.birthDate}
                    touched={touched.birthDate}
                    onKeyboardFocus={() => setKeyboardVisible(true)}
                  />
                </View>

                {/* Account Information */}
                <View style={styles.section}>
                  <SectionTitle title="Account Information" />
                  
                  <FormInput
                    label="Username"
                    value={values.username}
                    onChangeText={handleChange('username')}
                    onBlur={() => {
                      handleBlur('username');
                      setFieldTouched('username', true);
                    }}
                    placeholder="Enter username"
                    autoCapitalize="none"
                    error={errors.username}
                    touched={touched.username}
                    onKeyboardFocus={() => setKeyboardVisible(true)}
                  />

                  <FormInput
                    label="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={() => {
                      handleBlur('password');
                      setFieldTouched('password', true);
                    }}
                    placeholder="Enter new password (leave empty to keep current)"
                    secureTextEntry
                    error={errors.password}
                    touched={touched.password}
                    onKeyboardFocus={() => setKeyboardVisible(true)}
                  />
                </View>

                {/* Address Information */}
                <View style={styles.section}>
                  <SectionTitle title="Address Information" />
                  
                  <FormInput
                    label="Address"
                    value={values.address}
                    onChangeText={handleChange('address')}
                    onBlur={() => {
                      handleBlur('address');
                      setFieldTouched('address', true);
                    }}
                    placeholder="Enter street address"
                    autoCapitalize="words"
                    error={errors.address}
                    touched={touched.address}
                    onKeyboardFocus={() => setKeyboardVisible(true)}
                  />

                  <FormInput
                    label="City"
                    value={values.city}
                    onChangeText={handleChange('city')}
                    onBlur={() => {
                      handleBlur('city');
                      setFieldTouched('city', true);
                    }}
                    placeholder="Enter city"
                    autoCapitalize="words"
                    error={errors.city}
                    touched={touched.city}
                    onKeyboardFocus={() => setKeyboardVisible(true)}
                  />

                  <FormInput
                    label="State"
                    value={values.state}
                    onChangeText={handleChange('state')}
                    onBlur={() => {
                      handleBlur('state');
                      setFieldTouched('state', true);
                    }}
                    placeholder="Enter state"
                    autoCapitalize="words"
                    error={errors.state}
                    touched={touched.state}
                    onKeyboardFocus={() => setKeyboardVisible(true)}
                  />

                  <FormInput
                    label="Postal Code"
                    value={values.postalCode}
                    onChangeText={handleChange('postalCode')}
                    onBlur={() => {
                      handleBlur('postalCode');
                      setFieldTouched('postalCode', true);
                    }}
                    placeholder="Enter postal code"
                    keyboardType="number-pad"
                    error={errors.postalCode}
                    touched={touched.postalCode}
                    onKeyboardFocus={() => setKeyboardVisible(true)}
                  />

                  <FormInput
                    label="Country"
                    value={values.country}
                    onChangeText={handleChange('country')}
                    onBlur={() => {
                      handleBlur('country');
                      setFieldTouched('country', true);
                    }}
                    placeholder="Enter country"
                    autoCapitalize="words"
                    error={errors.country}
                    touched={touched.country}
                    onKeyboardFocus={() => setKeyboardVisible(true)}
                  />
                </View>

                {/* Education & Work */}
                <View style={styles.section}>
                  <SectionTitle title="Education & Work" />
                  
                  <FormInput
                    label="University"
                    value={values.university}
                    onChangeText={handleChange('university')}
                    onBlur={() => {
                      handleBlur('university');
                      setFieldTouched('university', true);
                    }}
                    placeholder="Enter university"
                    autoCapitalize="words"
                    error={errors.university}
                    touched={touched.university}
                    onKeyboardFocus={() => setKeyboardVisible(true)}
                  />

                  <FormInput
                    label="Company Name"
                    value={values.companyName}
                    onChangeText={handleChange('companyName')}
                    onBlur={() => {
                      handleBlur('companyName');
                      setFieldTouched('companyName', true);
                    }}
                    placeholder="Enter company name"
                    autoCapitalize="words"
                    error={errors.companyName}
                    touched={touched.companyName}
                    onKeyboardFocus={() => setKeyboardVisible(true)}
                  />

                  <FormInput
                    label="Job Title"
                    value={values.companyTitle}
                    onChangeText={handleChange('companyTitle')}
                    onBlur={() => {
                      handleBlur('companyTitle');
                      setFieldTouched('companyTitle', true);
                    }}
                    placeholder="Enter job title"
                    autoCapitalize="words"
                    error={errors.companyTitle}
                    touched={touched.companyTitle}
                    onKeyboardFocus={() => setKeyboardVisible(true)}
                  />
                </View>

                {/* Update Button */}
                <View style={styles.submitButtonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.submitButton,
                      loading && styles.submitButtonDisabled,
                    ]}
                    onPress={() => handleSubmit()}
                    disabled={loading}
                    activeOpacity={0.8}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color={colors.white} />
                    ) : (
                      <Text style={styles.submitButtonText}>Update</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </StatusbarContainer>
  );
};

export default EditUserScreen;

