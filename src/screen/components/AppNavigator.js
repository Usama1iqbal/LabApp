import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../Signup';
import Login from '../Login';
import AllRecords from '../AllRecords';
import LabHomeScreen from '../LabHomeScreen';
import PatientRecord from '../PatientRecord';
import LabHomeView from '../LabHomeView';
import PatientLabRecord from '../PatientLabRecord';
import AddTestResult from '../AddTestResult';
import ViewPendingPatient from '../ViewPendingPatient';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllRecords"
        component={AllRecords}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PatientRecord"
        component={PatientRecord}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LabHomeScreen"
        component={LabHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LabHomeView"
        component={LabHomeView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PatientLabRecord"
        component={PatientLabRecord}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AddTestResult"
        component={AddTestResult}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewPendingPatient"
        component={ViewPendingPatient}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
