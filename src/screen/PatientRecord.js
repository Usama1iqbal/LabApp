import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getPatientDetail } from '../API/Home';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import Boxx from './components/Boxx';
import ShadowLine from './components/ShadowLine';
import PagePatientDetail from './components/PagePatientDetail';
import NavHomeAddNotifiProfile from './components/NavHomeAddNotifiProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatientRecord = ({ navigation, route }) => {
  const { nic } = route.params; // AllRecords se aaya
  const [labId, setLabId] = useState();
  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem('Lab_ID'); // ← get karo, set nahi
      setLabId(id);
    })();
  }, []);

  const { data: patient, isLoading } = useQuery({
    queryKey: ['patientDetail', nic, labId],
    queryFn: () => getPatientDetail(nic, labId),
    enabled: !!nic && !!labId, // ← dono aane ke baad call ho
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2F80ED" />
      </View>
    );
  }

  return (
    <>
      <ScrollViewContainer>
        <Header
          title={`Patient: ${patient?.fname} ${patient?.lname}`}
          onPress={() => navigation.goBack()}
          fontSize={20}
        />
        <Boxx
          data={[
            { label: 'Name', value: `${patient?.fname} ${patient?.lname}` },
            { label: 'Age', value: patient?.age },
            { label: 'Gender', value: patient?.gender },
            { label: 'nic', value: patient?.nic },
          ]}
        />
        <ShadowLine />

        <View style={styles.statsCard}>
          {patient?.lab_reports?.length > 0 ? (
            patient.lab_reports.map(report => (
              <PagePatientDetail
                key={report.report_id}
                title={report.test_name} // ✅ testName → title
                subtitle={report.status} // ✅ status → subtitle
                extra={`Visit ID: ${report.vid || 'N/A'}`} // ✅ vid → extra
              />
            ))
          ) : (
            <Text style={{ textAlign: 'center', color: '#aaa', padding: 20 }}>
              No lab reports found
            </Text>
          )}
        </View>
      </ScrollViewContainer>
      <NavHomeAddNotifiProfile navigation={navigation} activeTab="Record" />
    </>
  );
};

const styles = StyleSheet.create({
  statsCard: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
});

export default PatientRecord;
