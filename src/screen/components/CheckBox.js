import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const Checkbox = ({ label, value, onChange }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onChange(!value)}
      activeOpacity={0.7}
    >
      <View style={[styles.box, value && styles.checked]}>
        {value && <Text style={styles.checkmark}>✓</Text>}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  box: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#0D253C',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checked: {
    backgroundColor: '#0D253C',
  },
  checkmark: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#0D253C',
    fontWeight: '500',
  },
});

export default Checkbox;