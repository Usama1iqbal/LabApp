import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import TextInputWraper from './components/TextInputWraper';
import BlueButton from './components/BlueButton';

import { useMutation } from '@tanstack/react-query';
import { signupAPI } from '../API/Home';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: handleSignup, isPending } = useMutation({
    mutationFn: signupAPI,
    onSuccess: () => {
      Alert.alert('Success', 'Account created! Please Login.', [
        { text: 'OK', onPress: () => navigation?.navigate('Login') },
      ]);
    },
    onError: error => {
      Alert.alert('Signup Failed', error.message || 'Network Error');
    },
  });

  return (
    <ScrollViewContainer>
      <View style={{ alignItems: 'center' }}>
        <Header title="Sign Up" fontSize={25} />
      </View>
      <TextInputWraper
        placeholder="Enter your Name"
        icon={require('../assests/Profile.png')}
        value={name}
        onChangeText={setName}
      />
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
        title={isPending ? 'Creating Account...' : 'Sign up'}
        onPress={() => handleSignup({ name, email, password })}
        disabled={isPending}
      />
      <View style={styles.footerContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#2F80ED', fontWeight: 'bold' }}>Sign In</Text>
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

export default Signup;
