import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

// 👇 Yahan 'title' add kiya
const Dropdown = ({ title, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  // 👇 Default value ab 'title' hogi (yani "Protocol")
  const [selectedOption, setSelectedOption] = useState(title);

  const handleSelect = option => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <View style={styles.container}>
      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => setIsOpen(!isOpen)}
      >
        {/* 👇 Yahan wo Title show hoga */}
        <Text style={styles.buttonText}>{selectedOption}</Text>
        <Text style={styles.arrowText}>{isOpen ? '˄' : '˅'}</Text>
      </TouchableOpacity>

      {/* LIST */}
      {isOpen && (
        <View style={styles.dropdownList}>
          {options.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionItem,
                { backgroundColor: selectedOption === item ? '#ccc' : '#fff' },
              ]}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: 150,
    // alignSelf: 'center', // Agar center karna ho to ye uncomment karein
    marginLeft: 20,
    zIndex: 100, // <--- ZAROORI: Taake button sab se upar dikhay
  },
  button: {
    backgroundColor: '#2D3E50', // Dark Blue
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45, // Height fix kar di taake button gayab na ho
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  arrowText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
  dropdownList: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 5,
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  optionText: {
    color: '#2D3E50',
    fontWeight: '600',
  },
});

export default Dropdown;
