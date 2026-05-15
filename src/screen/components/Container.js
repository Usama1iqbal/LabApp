import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Container = ({ onPress, name, detail, count, image, id }) => {
  return (
    <TouchableOpacity style={styles.patientCard} onPress={onPress}>
      {image && <Image source={image} style={styles.avatar} />}

      <View style={styles.cardDetails}>
        <Text style={styles.patientName}>{name || ''}</Text>
        {detail && <Text style={styles.detailText}>{detail}</Text>}
        {count !== undefined && (
          <Text style={styles.detailText}>Count: {count}</Text>
        )}
        {id !== undefined && <Text style={styles.detailText}>ID: {id}</Text>}
      </View>

      <Text style={styles.arrowIcon}>›</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  patientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: '#eee',
  },
  cardDetails: { flex: 1, justifyContent: 'center' },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D253C',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  detailText: {
    fontSize: 12,
    color: '#777',
    marginBottom: 2,
    fontWeight: '500',
  },
  arrowIcon: { fontSize: 24, color: '#ccc', fontWeight: 'bold' },
});

export default Container;
