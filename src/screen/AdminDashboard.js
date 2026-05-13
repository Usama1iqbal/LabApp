import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import HospitalList from '../components/HospitalList';
import { useQuery } from '@tanstack/react-query';
import { allHospital } from '../API/Home';

const AdminDashboard = ({ navigation }) => {
  const { data: hospitals = [], isLoading } = useQuery({
    queryKey: ['hospitals'],
    queryFn: allHospital,
  });

  return (
    <ScrollViewContainer>
      <Header title="Admin Panel" fontSize={35} />
      <Header title="Hospitals" fontSize={35} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <HospitalList
          data={hospitals}
          onSelect={item => alert(`Selected: ${item.name}`)}
        />
      )}
    </ScrollViewContainer>
  );
};

export default AdminDashboard;