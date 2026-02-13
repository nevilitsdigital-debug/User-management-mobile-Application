import * as Yup from 'yup';

// Login Validation Schema
export const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .trim()
    .min(3, 'Username must be at least 3 characters'),
  password: Yup.string()
    .required('Password is required')
    .trim()
    .min(6, 'Password must be at least 6 characters'),
});

// Add User Validation Schema
export const addUserValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: Yup.string()
    .required('Email is required')
    .trim()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  phone: Yup.string()
    .required('Phone number is required')
    .trim()
    .matches(/^[+]?[\d\s\-()]{7,20}$/, 'Please enter a valid phone number'),
  age: Yup.number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(1, 'Age must be at least 1')
    .max(150, 'Age must be less than 150')
    .integer('Age must be a whole number'),
  gender: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .oneOf(['male', 'female', 'other'], 'Gender must be male, female, or other'),
  username: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters'),
  password: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be less than 50 characters'),
  birthDate: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .matches(/^\d{4}-\d{1,2}-\d{1,2}$/, 'Birth date must be in YYYY-MM-DD or YYYY-M-D format'),
  address: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .max(200, 'Address must be less than 200 characters'),
  city: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .max(100, 'City must be less than 100 characters'),
  state: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .max(100, 'State must be less than 100 characters'),
  postalCode: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .matches(/^[0-9]{5}(-[0-9]{4})?$|^[A-Za-z0-9\s-]{3,10}$/, 'Please enter a valid postal code'),
  country: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .max(100, 'Country must be less than 100 characters'),
  university: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .max(200, 'University name must be less than 200 characters'),
  companyName: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .max(200, 'Company name must be less than 200 characters'),
  companyTitle: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .max(100, 'Job title must be less than 100 characters'),
});

