// components/DropdownArrow.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';

const DropdownArrow = ({
  placeholder = 'Select option',
  icon,
  data = [],        // [{ label: 'Shifa', value: '123' }]
  value,            // selected value
  onChange,         // (item) => void
  loading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = data.find(item => item.value === value)?.label;

  return (
    <View style={styles.wrapper}>
      {/* ── Trigger Row ── */}
      <TouchableOpacity
        style={[styles.trigger, isOpen && styles.triggerOpen]}
        onPress={() => setIsOpen(prev => !prev)}
        activeOpacity={0.8}
      >
        {/* Left Icon */}
        {icon && (
          <Image source={icon} style={styles.leftIcon} />
        )}

        {/* Label */}
        <Text
          style={[styles.labelText, !selectedLabel && styles.placeholder]}
          numberOfLines={1}
        >
          {loading ? 'Loading...' : selectedLabel || placeholder}
        </Text>

        {/* Arrow */}
        <Text style={[styles.arrow, isOpen && styles.arrowUp]}>⌄</Text>
      </TouchableOpacity>

      {/* ── Dropdown List ── */}
      {isOpen && !loading && (
        <View style={styles.listContainer}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.value?.toString() ?? index.toString()}
            scrollEnabled={data.length > 5}
            nestedScrollEnabled
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.listItem,
                  item.value === value && styles.listItemActive,
                ]}
                onPress={() => {
                  onChange?.(item);
                  setIsOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.listItemText,
                    item.value === value && styles.listItemTextActive,
                  ]}
                >
                  {item.label}
                </Text>

                {/* Checkmark for selected */}
                {item.value === value && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>Koi option nahi mila</Text>
              </View>
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginVertical: 8,
    zIndex: 999,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    backgroundColor: '#fff',
  },
  triggerOpen: {
    borderColor: '#2F80ED',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  leftIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#999',
    marginRight: 10,
  },
  labelText: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  placeholder: {
    color: '#aaa',
  },
  arrow: {
    fontSize: 20,
    color: '#aaa',
    lineHeight: 22,
  },
  arrowUp: {
    transform: [{ rotate: '180deg' }],
  },
  listContainer: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#2F80ED',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: '#fff',
    maxHeight: 220,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listItemActive: {
    backgroundColor: '#EBF3FF',
  },
  listItemText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  listItemTextActive: {
    color: '#2F80ED',
    fontWeight: '600',
  },
  checkmark: {
    color: '#2F80ED',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyBox: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    color: '#aaa',
    fontSize: 13,
  },
});

export default DropdownArrow;