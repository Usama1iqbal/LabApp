import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Boxx = ({ data = [] }) => {
  return (
    <View style={styles.statsCard}>
      {data.map((item, index) => (
        <Text key={index} style={styles.statText}>
          {item.label}:{' '}
          <Text style={{ fontWeight: 'normal' }}>{item.value}</Text>
        </Text>
      ))}
    </View>
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
  statText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0D253C',
    marginBottom: 8,
  },
});

export default Boxx;