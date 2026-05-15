import React from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getPatientsFromDB } from '../API/Home';
import Header from './components/Header';
import Dropdown from './components/Dropdown';
import TextInputWraper from './components/TextInputWraper';
import PatientDetails from './components/PatientDetails';
import NavHomeAddNotifiProfile from './components/NavHomeAddNotifiProfile';

const AllRecords = ({ navigation }) => {
  const { data: patients, isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: getPatientsFromDB,
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header
        title="All Records"
        onPress={() => navigation.goBack()}
        fontSize={20}
      />
      <View style={styles.searchRow}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <TextInputWraper placeholder="Search" />
        </View>
        <Dropdown title="Search By" options={['Name', 'NIC']} />
      </View>

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#2F80ED"
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={patients}
          style={{ flex: 1 }}
          keyExtractor={item => item.nic.toString()}
          
          renderItem={({ item }) => (
            <PatientDetails
              title={`${item.fname} ${item.lname}`}
              subtitle={`NIC: ${item.nic}`}
              extra={item.updated_at}
              onPress={() =>
                navigation.navigate('PatientRecord', { nic: item.nic })
              }
            />
          )}
          ListEmptyComponent={
            <ActivityIndicator size="large" color="#2F80ED" />
          }
           contentContainerStyle={{ paddingHorizontal: 35, paddingBottom: 50 }}
        />
      )}

      <NavHomeAddNotifiProfile navigation={navigation} activeTab="Record" />
    </View>
  );
};

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
});

export default AllRecords;
