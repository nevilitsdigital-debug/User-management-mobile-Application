import React from 'react';
import { StatusBar, StatusBarStyle } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface StatusbarContainerProps {
  children: React.ReactNode;
  barStyle?: StatusBarStyle;
}

const StatusbarContainer: React.FC<StatusbarContainerProps> = ({ 
  children,
  barStyle = 'light-content',
}) => {
  return (
    <SafeAreaProvider>
      <StatusBar translucent barStyle={barStyle} backgroundColor="transparent" />
      {children}
    </SafeAreaProvider>
  );
};

export default StatusbarContainer;