import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { lockSingleTest, unlockSingleTest } from '../API/Home';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Boxx from './components/Boxx';
import ShadowLine from './components/ShadowLine';
import Button from './components/Button';

const AddTestResult = ({ navigation, route }) => {
  const { test_req_id, patient_name, test_name } = route.params; // pichli screen se
  const userId = global.USER_ID;

  const [isLocked, setIsLocked] = useState(false);

  // ─── Step 1: Lock ───────────────────────────────────
  const { mutate: lockTest } = useMutation({
    mutationFn: () => lockSingleTest(test_req_id, userId),
    onSuccess: () => {
      setIsLocked(true);
    },
    onError: error => {
      Alert.alert(
        'Lock Failed',
        error.message || 'Someone else is working on this test',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    },
  });

  // Screen khulte hi lock karo
  useEffect(() => {
    lockTest();
  }, []);

  // ─── Step 2: Save + Unlock ──────────────────────────
  const { mutate: saveAndUnlock, isPending: isSaving } = useMutation({
    mutationFn: async () => {
      // Pehle save logic yahan aayega
      // Phir unlock
      await unlockSingleTest(test_req_id, userId);
    },
    onSuccess: () => {
      Alert.alert('Success', 'Result Saved!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    },
    onError: error => {
      Alert.alert('Error', error.message || 'Save failed');
    },
  });

  // ─── Loading ────────────────────────────────────────
  if (!isLocked) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2F80ED" />
        <Text style={{ marginTop: 10, color: '#777' }}>Locking test...</Text>
      </View>
    );
  }

  // ─── Main UI ────────────────────────────────────────
  return (
    <>
      <ScrollViewContainer>
        <Header
          title="Test Result"
          onPress={() => navigation.goBack()}
          fontSize={20}
        />
        <Header
          title={`Patient: ${patient_name}`}
          fontSize={20}
        />
        <Header
          title={`Test: ${test_name}`}
          fontSize={20}
        />
        <Boxx data={[{ value: 'Summary.' }]} />

        <Header title="Result" fontSize={35} />

        <View style={[styles.serverHeaderRow, styles.headerBorder]}>
          <Text style={styles.middleTitle}>Parameter</Text>
          <Text style={styles.middleTitle}>Range</Text>
          <Text style={styles.middleTitle}>Units</Text>
          <Text style={styles.middleTitle}>Result</Text>
        </View>
        <ShadowLine />

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Button
            title={isSaving ? 'Saving...' : 'Save'}
            onPress={saveAndUnlock}
            disabled={isSaving}
          />
        </View>
      </ScrollViewContainer>
      <Navigation />
    </>
  );
};
const styles = StyleSheet.create({
  statsCard: {
    backgroundColor: 'white',
    padding: 12, // ← 190 se 12 karo
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0', // ← thoda light karo
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  serverHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  middleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0D253C',
    flex: 1,
  },
});

export default AddTestResult;
