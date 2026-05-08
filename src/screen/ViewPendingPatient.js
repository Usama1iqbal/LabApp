import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  FlatList,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAcceptedList } from '../API/Home';
import Header from './components/Header';
import Dropdown from './components/Dropdown';
import TextInputWraper from './components/TextInputWraper';
import PatientDetails from './components/PatientDetails';
import NavHomeAddNotifiProfile from './components/NavHomeAddNotifiProfile';

const ViewPendingPatient = ({ navigation }) => {
  const { data: patients = [], isLoading } = useQuery({
    queryKey: ['acceptedList'],
    queryFn: getAcceptedList,
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="Accepted Test" fontSize={20} />

      <View style={styles.searchRow}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <TextInputWraper placeholder="Search" />
        </View>
        <Dropdown title="Search By" options={['Name', 'MPI']} />
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
          keyExtractor={item => item.mpi.toString()}
          contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <PatientDetails
              title={`${item.fname} ${item.lname}`}
              subtitle={`MPI: ${item.mpi}`}
              extra={`Visit ID: ${item.vid}`}
              onPress={() =>
                navigation.navigate('AddTestResult', {
                  mpi: item.mpi,
                  vid: item.vid,
                })
              }
            />
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: '#aaa', marginTop: 50 }}>
              No accepted test request found
            </Text>
          }
        />
      )}

      <NavHomeAddNotifiProfile navigation={navigation} activeTab="Test" />
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

export default ViewPendingPatient;
