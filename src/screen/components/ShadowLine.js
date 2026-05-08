import React from 'react';
import { StyleSheet, View } from 'react-native';
const ShadowLine = () => {
  return <View style={styles.shadowLine} />;
};

// StyleSheet mein:
const styles = StyleSheet.create({
  shadowLine: {
    height: 1,
    backgroundColor: '#D3D3D3', // upar wali line (gehri)
    marginHorizontal: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Android ke liye (yeh dusri line jaisi effect deta hai)
  },
});
export default ShadowLine;
