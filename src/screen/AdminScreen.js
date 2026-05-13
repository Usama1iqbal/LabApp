import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import Button from '../components/Button';
import TextinputField from '../components/TextinputField';
import Checkbox from '../components/CheckBox';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  changeConfig,
  addHospital,
  allHospital,
  configHistory,
} from '../../API/Home2';

const AdminScreen = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [hospitalName, setHospitalName] = useState('');
  const [showAddHospital, setShowAddHospital] = useState(false);

  const { mutate: saveConfig, isPending } = useMutation({
    mutationFn: changeConfig,
    onSuccess: data => Alert.alert('Success', data.message),
    onError: error => Alert.alert('Error', error.message),
  });

  const { mutate: addHospitalMutate, isPending: hospitalPending } = useMutation(
    {
      mutationFn: addHospital,
      onSuccess: data => {
        Alert.alert('Success', data.message);
        setHospitalName('');
        setShowAddHospital(false); // 👈 save ke baad hide kar do
      },
      onError: error => Alert.alert('Error', error.message),
    },
  );

  // const { data: hospitals = [], isLoading: hospitalsLoading } = useQuery({
  //   queryKey: ['hospitals'],
  //   queryFn: allHospital,
  // });

  return (
    <ScrollViewContainer>
      <Header title="Admin Panel" fontSize={35} />

      {/* Top Buttons */}
      <View style={styles.statsCard}>
        <View style={styles.serverHeaderRow}>
          <Button
            title={'Show Hospitals'}
            onPress={() => navigation.navigate('AdminDashboard')}
            style={{ flex: 1 }}
          />
          <Button
            title="Add Hospital"
            onPress={() => setShowAddHospital(prev => !prev)} // 👈 toggle karo
            style={{ flex: 1 }}
          />
        </View>
      </View>

      {/* Add Hospital Form - sirf tab dikhao jab button press ho */}
      {showAddHospital && (
        <View style={styles.statsCard}>
          <TextinputField
            placeholder="Enter Hospital Name"
            value={hospitalName}
            onChangeText={setHospitalName}
          />
          <View style={styles.serverHeaderRow}>
            <Button
              title={hospitalPending ? 'Saving...' : 'Save'}
              onPress={() => addHospitalMutate(hospitalName)} // 👈 sirf addHospital API
            />
            <Button
              title="Cancel"
              onPress={() => {
                setHospitalName('');
                setShowAddHospital(false); // 👈 cancel pe hide
              }}
            />
          </View>
        </View>
      )}

      {/* Hold Data - alag, sirf changeConfig call kare */}
      <View style={styles.statsCard}>
        <View style={styles.serverHeaderRow}>
          <Header title="Hold data" fontSize={15} />
          <Checkbox value={isChecked} onChange={setIsChecked} />
          <Button
            title={isPending ? 'Saving...' : 'Save'}
            onPress={() => saveConfig({ hold_flag: isChecked })} // 👈 sirf changeConfig
          />
        </View>
      </View>

      <Button
        title="History"
        onPress={() => navigation.navigate('HistoryScreen')}
      />
    </ScrollViewContainer>
  );
};

const styles = StyleSheet.create({
  statsCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#0a0b0eff',
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  serverHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
});

export default AdminScreen;
