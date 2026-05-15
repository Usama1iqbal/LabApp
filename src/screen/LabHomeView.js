import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import Boxx from './components/Boxx';
import Dropdown from './components/Dropdown';
import NavHomeAddNotifiProfile from './components/NavHomeAddNotifiProfile';
import TextinputField from './components/TextinputField';
import Button from './components/Button';
import ShadowLine from './components/ShadowLine';
import {
  getPatientProcess,
  updateReportStatus,
  unlockTestRequest,
} from '../API/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LabHomeView = ({ navigation, route }) => {
  const { nic, vid, is_locked } = route.params; // LabHomeScreen se aaya
  const [userId, setuserId] = useState(null);

  const [statusMap, setStatusMap] = useState({});
  const [billMap, setBillMap] = useState({});

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem('user_id');
      setuserId(Number(id));
    })();
  }, []);

  // ─── Step 2: Patient Data ───────────────────────────
  const {
    data: patientData,
    isLoading,
    error: patientError,
  } = useQuery({
    queryKey: ['patientProcess', nic, vid],
    queryFn: () => getPatientProcess(nic, vid),
    enabled: is_locked,
  });

  // useEffect mein handle karo
  useEffect(() => {
    if (patientError) {
      Alert.alert('Error', patientError.message || 'Patient not found', [
        { text: 'OK', onPress: () => navigation.navigate('LabHomeScreen') },
      ]);
    }
  }, [patientError, navigation]);
  // ─── Step 3 + 4: Save + Unlock ─────────────────────
  const { mutate: saveAndUnlock, isPending: isSaving } = useMutation({
    mutationFn: async () => {
      // Pehle status update karo
      await updateReportStatus({
        req_id_status: statusMap,
        req_id_bill: billMap,
        user_id: userId,
        visit_id: vid,
      });
      // Phir unlock karo
      await unlockTestRequest(vid, userId);
    },
    onSuccess: () => {
      Alert.alert('Success', 'Saved Successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('LabHomeScreen') },
      ]);
    },
    onError: error => {
      Alert.alert('Error', error.message || 'Save failed');
    },
  });

  // ─── Loading State ──────────────────────────────────
  if (!is_locked || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2F80ED" />
        <Text style={{ marginTop: 10, color: '#777' }}>
          {!is_locked ? 'Locking request...' : 'Loading patient...'}
        </Text>
      </View>
    );
  }

  // ─── Main UI ────────────────────────────────────────
  return (
    <>
      <ScrollViewContainer>
        <Header
          title={`Patient: ${patientData?.fname} ${patientData?.lname}`}
          onPress={() => navigation.goBack()}
          fontSize={20}
        />
        <Boxx
          data={[
            { label: 'nic', value: patientData?.nic },
            { label: 'VID', value: vid },
            { label: 'Age', value: patientData?.age },
            { label: 'Gender', value: patientData?.gender },
          ]}
        />

        <View style={styles.serverHeaderRow}>
          <Header title="Lab Tests" fontSize={20} />
        </View>

        {patientData?.lab_reports?.map(report => (
          <View key={report.report_id} style={styles.statsCard}>
            <View style={styles.serverHeaderRow}>
              <Header title={report.test_name} fontSize={20} />
              <Dropdown
                title={report.status || 'Status'}
                options={['Accepted', 'Declined']}
                onSelect={val => {
                  setStatusMap(prev => ({
                    ...prev,
                    [report.report_id]: val,
                  }));
                }}
              />
            </View>
            <TextinputField
              title="Bill Amount"
              placeholder="Enter amount"
              keyboardType="numeric"
              onChangeText={val => {
                setBillMap(prev => ({
                  ...prev,
                  [report.report_id]: parseFloat(val) || 0,
                }));
              }}
            />

            {/* ✅ Add Result Button — map ke andar */}
            <Button
              title="Add Result"
              onPress={() =>
                navigation.navigate('AddTestResult', {
                  test_req_id: report.report_id,
                  patient_name: `${patientData?.fname} ${patientData?.lname}`,
                  test_name: report.test_name,
                })
              }
            />
          </View>
        ))}

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Button
            title={isSaving ? 'Saving...' : 'Save'}
            onPress={saveAndUnlock}
            disabled={isSaving}
          />
        </View>

        <ShadowLine />
      </ScrollViewContainer>
      <NavHomeAddNotifiProfile navigation={navigation} activeTab="Home" />
    </>
  );
};

const styles = StyleSheet.create({
  serverHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 10,
  },
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

export default LabHomeView;
