import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  Alert,
} from 'react-native';
import { useState, useEffect } from 'react';
import { getPendingList, lockTestRequest } from '../API/Home';
import { useQuery, useMutation } from '@tanstack/react-query';
import Header from './components/Header';
import Dropdown from './components/Dropdown';
import TextInputWraper from './components/TextInputWraper';
import PatientDetails from './components/PatientDetails';
import NavHomeAddNotifiProfile from './components/NavHomeAddNotifiProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LabHomeScreen = ({ navigation }) => {
  const { data: patients, isLoading } = useQuery({
    queryKey: ['patientList'],
    queryFn: getPendingList,
  });
  
  const [userId, setuserId] = useState(null);
  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem('user_id');
      setuserId(Number(id));
    })();
  }, []);

  const { mutate: lockRequest, onSuccess } = useMutation({
    mutationFn: lockTestRequest,
    onSuccess: (data, variables) => {
      console.log('Lock acquired, navigating to LabHomeView');
      navigation.navigate('LabHomeView', {
        mpi: variables.mpi, // Pass mpi from the variables sent to the mutation
        vid: variables.vid,
        is_locked: true
      });
    },
    onError: (error) => {
      Alert.alert(
        'Lock Failed',
        error.message || 'Someone else is working on this',
        [{ text: 'OK', onPress: () => navigation.navigate('LabHomeScreen') }],
      );
    },
  });

  function lock_and_navigate(mpi, vid) {

    if (!userId) {
      Alert.alert('Error', 'User ID not found. Please log in again.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
      return;
    }
    lockRequest({ vid, userId, mpi  });
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="Pending List" fontSize={20} />
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
              onPress={() => lock_and_navigate(item.mpi, item.vid)}
            />
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: '#aaa', marginTop: 50 }}>
              No pending request
            </Text>
          }
        />
      )}
      <Text style={{ textAlign: 'center', color: '#aaa', marginTop: 50 }}>
        No pending request
      </Text>

      <NavHomeAddNotifiProfile navigation={navigation} activeTab="Home" />
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

export default LabHomeScreen;
