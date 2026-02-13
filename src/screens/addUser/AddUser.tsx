import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import StatusbarContainer from '../../components/statusbar/StatusbarContainer';
import Header from '../../components/Header/Header';
import FormInput from '../../components/FormInput/FormInput';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { makeAuthenticatedPostRequest } from '../../config/axios';
import { showSuccess, showError } from '../../messageHelper/Helper';
import { addUserValidationSchema } from '../../utils/ValidationSchema';
import styles from './AddUser.styles';
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

const AddUserScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const initialValues: FormValues = {
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
  };

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const userData = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        ...(values.age && { age: parseInt(values.age) }),
        ...(values.gender && { gender: values.gender.trim() }),
        ...(values.username && { username: values.username.trim() }),
        ...(values.password && { password: values.password.trim() }),
        ...(values.birthDate && { birthDate: values.birthDate.trim() }),
        address: {
          address: values.address.trim() || '',
          city: values.city.trim() || '',
          state: values.state.trim() || '',
          postalCode: values.postalCode.trim() || '',
          country: values.country.trim() || '',
        },
        ...(values.university && { university: values.university.trim() }),
        ...(values.companyName && {
          company: {
            name: values.companyName.trim(),
            ...(values.companyTitle && { title: values.companyTitle.trim() }),
          },
        }),
      };

      const result = await dispatch(
        makeAuthenticatedPostRequest('users/add', userData) as any
      );

      console.log('Add User API response', result);

      if (result?.type === 'success') {
        showSuccess('User added successfully');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StatusbarContainer>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <Header title="Add User" showBackButton={true} />
        <Formik
          initialValues={initialValues}
          validationSchema={addUserValidationSchema}
          onSubmit={handleSubmit}
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
                    placeholder="Enter password"
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

                {/* Submit Button */}
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
                      <Text style={styles.submitButtonText}>Submit</Text>
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

export default AddUserScreen;