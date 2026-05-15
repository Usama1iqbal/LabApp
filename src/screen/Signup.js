import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import TextInputWraper from './components/TextInputWraper';
import BlueButton from './components/BlueButton';
import DropdownArrow from './components/DropdownArrow';
import { useMutation, useQuery } from '@tanstack/react-query';
import { signupAPI, getAllLabs } from '../API/Home';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lab, setLab] = useState('');

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

  const { data: LabData, isLoading } = useQuery({
    queryKey: ['labs'],
    queryFn: getAllLabs,
  });

  // Transform data for Dropdown (label/value format)
  const LabList =
    LabData?.map(h => ({
      label: h.name,
      value: h.lab_id,
    })) || [];

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

      <DropdownArrow
        placeholder="Select Lab"
        icon={require('../assests/Logs.png')}
        data={LabList} // Fix 2: Using transformed list
        value={lab}
        onChange={item => setLab(item.value)} // Fix 3: Setting the ID
        loading={isLoading}
      />
      <BlueButton
        title={isPending ? 'Creating Account...' : 'Sign up'}
        onPress={() => handleSignup({ name, email, password, lab_id: lab })}
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
