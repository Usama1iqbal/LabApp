import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import TextInputWraper from './components/TextInputWraper';
import BlueButton from './components/BlueButton';

import { useMutation } from '@tanstack/react-query';
import { loginAPI } from '../API/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useMutation
  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: loginAPI,    
    onSuccess: async (response) => {
      await AsyncStorage.setItem('user_id', String(response?.user_id));
      navigation.navigate('AllRecords');
    },
    onError: error => {
      Alert.alert('Login Failed', error.message || 'Network Error');
    },
  });

  return (
    <ScrollViewContainer>
      <View style={{ alignItems: 'center' }}>
        <Header
          title="Login"
          onPress={() => navigation.goBack()}
          fontSize={25}
        />
      </View>
      <TextInputWraper
        placeholder="Enter your Email"
        icon={require('../assests/Email.png')}
        value={email}
        onChangeText={setEmail}
      />
      <TextInputWraper
        placeholder="Enter your Password"
        icon={require('../assests/Password.png')}
        rightIcon={require('../assests/eye-slash.png')}
        isPassword={true}
        value={password}
        onChangeText={setPassword}
      />
      
      <BlueButton
        title={isPending ? 'Logging in...' : 'Sign in'}
        onPress={() => handleLogin({ email, password })}
      />
      <View style={styles.footerContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{ color: '#2F80ED', fontWeight: 'bold' }}>Sign up</Text>
        </TouchableOpacity>
      </View>
       <View style={styles.footerContainer}>
        <Text>Login as admin?</Text>
        <TouchableOpacity onPress={() => navigation?.navigate('LoginAdmin')}>
          <Text style={{ color: '#2F80ED', fontWeight: 'bold' }}>
            Admin Screen
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollViewContainer>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Login;
