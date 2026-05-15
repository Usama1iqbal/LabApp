import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const HospitalList = ({ data, onSelect }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onSelect(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.hospitalName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) =>
        item?.Lab_id?.toString() ?? index.toString()
      }
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB', // Light border
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A365D', // Dark blue color like your image
  },
});

export default HospitalList;
