import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';
import LoginScreen from '../screens/login/Login';
import UserListScreen from '../screens/userList/UserList';
import UserDetailsScreen from '../screens/userDetails/userDetails';
import AddUserScreen from '../screens/addUser/AddUser';
import EditUserScreen from '../screens/editUser/editUser';
import MusicScreen from '../screens/music/Music';
import colors from '../utils/colors';
import MusicDetailsScreen from '../screens/musicDetails/MusicDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// User Stack Navigator (contains all user-related screens)
const UserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="userList" component={UserListScreen} />
      <Stack.Screen name="userDetails" component={UserDetailsScreen} />
      <Stack.Screen name="addUser" component={AddUserScreen} />
      <Stack.Screen name="editUser" component={EditUserScreen} />
    </Stack.Navigator>
  );
};

// Music Stack Navigator (placeholder for future music screens)
const MusicStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="musicHome" component={MusicScreen} />
      <Stack.Screen name="musicDetails" component={MusicDetailsScreen} />
    </Stack.Navigator>
  );
};

// Bottom Tab Navigator
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="UserTab"
        component={UserStack}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>👤</Text>
          ),
        }}
      />
      <Tab.Screen
        name="MusicTab"
        component={MusicStack}
        options={{
          tabBarLabel: 'Music',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🎵</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Root Navigator
const NavigationContainerComponent = () => {
  const accessToken = useSelector((state: any) => state.user.accessToken);
  const initialRouteName = accessToken ? 'MainTabs' : 'login';

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationContainerComponent;