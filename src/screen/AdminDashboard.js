import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import HospitalList from './components/HospitalList';
import { useQuery } from '@tanstack/react-query';
import { allLab } from '../API/Home';

const AdminDashboard = ({ navigation }) => {
  const { data: Lab = [], isLoading } = useQuery({
    queryKey: ['labs'],
    queryFn: allLab,
  });

  return (
    <ScrollViewContainer>
      <Header title="Admin Panel" fontSize={35} />
      <Header title="Labs" fontSize={35} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <HospitalList
          data={Lab}
          onSelect={item => alert(`Selected: ${item.name}`)}
        />
      )}
    </ScrollViewContainer>
  );
};

export default AdminDashboard;
