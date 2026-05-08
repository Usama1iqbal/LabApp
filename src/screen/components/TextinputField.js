import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const TextInputField = ({
  placeholder,
  value,
  onChangeText,
  onRemove,
  title, // <--- Prop receive kiya
}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.label}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#999"
          editable={!onRemove}
        />

        {/* 3. REMOVE BUTTON */}
        {onRemove && (
          <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 15, // Har field ke baad gap
    width: '100%',
  },

  // 👇 TITLE KA STYLE (Jo missing tha)
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D253C', // Dark Blue
    marginBottom: 8, // Title aur Box ke beech gap
    marginLeft: 5, // Thora side par
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FBFD',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E1EAF2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    height: 60,
  },
  input: {
    flex: 1,
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#2D3E50',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TextInputField;
