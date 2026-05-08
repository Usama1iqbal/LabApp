import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';


import Navigation from './components/Navigation';
import Boxx from './components/Boxx';
import ShadowLine from './components/ShadowLine';
import PagePAtientDetail from './components/PagePatientDetail';

const PatientLabRecord = ({ navigation }) => {
  return (
    <>
      <ScrollViewContainer>
        <Header
          title="Patient : Patient Name"
          onPress={() => navigation.goBack()}
          fontSize={20}
        />

        <Header
          title="CBC : Report Sumarry"
          onPress={() => navigation.goBack()}
          fontSize={20}
        />
        <Boxx
          data={[
            {
              value:
                'The Complete Blood Count (CBC) shows abnormally low values across several key parameters, requiring attention. The low HB (Hemoglobin) level (11.5; Normal 12–15) suggests anemia or reduced oxygen-carrying capacity.',
            },
          ]}
        />

        <Header title="Result" fontSize={35} />

        <View style={[styles.serverHeaderRow, styles.headerBorder]}>
          <Text style={styles.middleTitle}>Parameter</Text>
          <Text style={styles.middleTitle}>Range</Text>
          <Text style={styles.middleTitle}>Units</Text>
          <Text style={styles.middleTitle}>Result</Text>
        </View>
        <ShadowLine></ShadowLine>
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

export default PatientLabRecord;
