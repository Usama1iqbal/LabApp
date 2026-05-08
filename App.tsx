import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/screen/components/AppNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const MainApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default MainApp;
