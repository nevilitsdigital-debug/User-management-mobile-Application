# CuneiformDemo

A React Native application for managing user data with authentication, CRUD operations, form validation, and music search functionality with YouTube integration.

## Prerequisites

- Node.js >= 18
- React Native development environment set up ([Setup Guide](https://reactnative.dev/docs/set-up-your-environment))
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

## Installation

Install all dependencies:

```sh
npm install
```

## Running the App

### Start Metro Bundler

```sh
npm start
```

### Run on Android

```sh
npm run android
```

### Run on iOS

First, install CocoaPods dependencies:

```sh
cd ios
pod install
cd ..
```

Then run:

```sh
npm run ios
```

## Project Structure

```
src/
├── assets/              # Static assets (images, icons)
│   └── BackButton.png
│
├── components/          # Reusable UI components
│   ├── DetailsCard/     # Component for displaying user detail sections
│   ├── FormInput/       # Reusable form input component with validation
│   ├── Header/          # App header with back button and title
│   ├── ListCard/        # Component for displaying user list items
│   ├── loader/          # Loading spinner component
│   ├── Modal/           # Custom modal component for confirmations
│   ├── SectionTitle/    # Reusable section title component
│   ├── SongCard/        # Component for displaying song items in music list
│   └── statusbar/       # Status bar container wrapper
│
├── screens/             # Application screens
│   ├── login/           # Login screen with authentication
│   ├── userList/        # List of all users with pagination
│   ├── userDetails/     # Detailed view of a single user
│   ├── addUser/         # Form to add a new user
│   ├── editUser/        # Form to edit existing user
│   ├── music/           # Music search screen with song listing
│   └── musicDetails/    # Music details screen with YouTube player
│
├── config/              # Configuration files
│   ├── axios/           # Axios instance and API request helpers
│   └── url.config.js    # API base URL configuration
│
├── navigation/          # Navigation setup
│   └── index.tsx        # Navigation configuration with bottom tabs and stack navigators
│
├── store/               # Redux store configuration
│   └── configureStore.tsx
│
├── slices/              # Redux slices
│   └── userSlice.tsx    # User state management
│
├── utils/               # Utility functions and constants
│   ├── colors.tsx       # Color palette
│   ├── commonStyles.tsx # Shared styles
│   ├── images.tsx       # Image references
│   ├── responsiveSize.tsx # Responsive scaling functions
│   ├── string.tsx       # String utilities
│   └── ValidationSchema.tsx # Yup validation schemas
│
└── messageHelper/        # Flash message helpers
    └── Helper.js        # Success/error message utilities
```

## Libraries and Their Purpose

### Core Framework
- **react** (19.1.0) - React library
- **react-native** (0.81.0) - React Native framework

### Navigation
- **@react-navigation/native** (^7.1.28) - Core navigation library
- **@react-navigation/native-stack** (^7.12.0) - Stack navigator for screen navigation
- **@react-navigation/bottom-tabs** (^7.13.0) - Bottom tab navigator for main app sections (User and Music tabs)
- **react-native-screens** (^4.23.0) - Native screen components for better performance
- **react-native-safe-area-context** (^5.6.2) - Safe area handling for notched devices

### State Management
- **@reduxjs/toolkit** (^2.11.2) - Redux toolkit for state management
- **react-redux** (^9.2.0) - React bindings for Redux
- **redux-persist** (^6.0.0) - Persist Redux state to AsyncStorage

### Data Persistence
- **@react-native-async-storage/async-storage** (^2.2.0) - Local storage for persisting data (tokens, user data)

### API & Network
- **axios** (^1.13.5) - HTTP client for API requests

### Form Management & Validation
- **formik** (^2.4.9) - Form state management and handling
- **yup** (^1.7.1) - Schema validation for form inputs

### UI/UX
- **react-native-flash-message** (^0.4.2) - Flash messages for success/error notifications

### Media & WebView
- **react-native-webview** (13.6.3) - WebView component for displaying web content (required by YouTube player)
- **react-native-youtube-iframe** (^2.4.1) - YouTube video player component for playing music videos

## Building Release APK

### Generate Release Keystore (First time only)

The release keystore is already generated. If you need to create a new one:

```sh
keytool -genkeypair -v -storetype PKCS12 -keystore android/app/release.keystore -alias cuneiformdemo-key -keyalg RSA -keysize 2048 -validity 10000
```

### Build Release APK

```sh
cd android
./gradlew assembleRelease
```

The APK will be generated at: `android/app/build/outputs/apk/release/app-release.apk`

## Key Features

- **Authentication**: Login with fixed credentials
- **User Management**: 
  - View list of users with pagination
  - View user details
  - Add new users
  - Edit existing users
  - Delete users
- **Music Search**: 
  - Search for songs using external API
  - View song list with thumbnails
  - Play YouTube videos in-app
  - View song details (artist, album, duration, etc.)
- **Navigation**: 
  - Bottom tab navigation with User and Music tabs
  - Stack navigation within each tab
- **Form Validation**: Comprehensive validation using Formik and Yup
- **State Management**: Redux with persistence for user data and song list
- **Responsive Design**: Responsive sizing utilities for different screen sizes
- **Loading States**: Custom loader component
- **Error Handling**: Flash messages for user feedback

## Development

### Code Structure

- Each screen has its own folder with component and styles files
- Reusable components are in the `components` folder
- API calls are centralized in `config/axios`
- Validation schemas are in `utils/ValidationSchema.tsx`
- Redux slices manage application state

### Styling

- Styles are co-located with components (`.styles.tsx` files)
- Responsive utilities from `utils/responsiveSize.tsx` for scaling
- Color constants in `utils/colors.tsx`

## Troubleshooting

If you encounter issues:

1. Clear Metro cache: `npm start -- --reset-cache`
2. Clean Android build: `cd android && ./gradlew clean`
3. Reinstall dependencies: `rm -rf node_modules && npm install`
4. For iOS: `cd ios && pod install && cd ..`

## Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Formik Documentation](https://formik.org/)
- [React Native WebView](https://github.com/react-native-webview/react-native-webview)
- [React Native YouTube iFrame](https://github.com/LonelyCpp/react-native-youtube-iframe)
