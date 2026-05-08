import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Humne 'navigation' aur 'activeTab' ko props mein liya taake ye dynamic ho sake
const NavHomeAddNotifiProfile = ({ navigation, activeTab }) => {
  // Blue color jo aapne image mein dikhaya
  const activeColor = '#2F80ED';
  const inactiveColor = '#999';

  return (
    <View style={styles.bottomNav}>
      {/* 1. Home Button */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('PatientList')} // PatientList screen par le jayega
      >
        <Image
          source={require('../../assests/GHR.png')}
          style={[
            styles.navIconImage,
            { tintColor: activeTab === 'Home' ? activeColor : inactiveColor },
          ]}
        />
        <Text
          style={[
            styles.navText,
            { color: activeTab === 'Home' ? activeColor : inactiveColor },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* 2. Add Patient Button */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('AddPatient')} // AddPatient screen par le jayega
      >
        <Image
          source={require('../../assests/AddPatient.png')}
          style={[
            styles.navIconImage,
            { tintColor: activeTab === 'Add' ? activeColor : inactiveColor },
          ]}
        />
        <Text
          style={[
            styles.navText,
            { color: activeTab === 'Add' ? activeColor : inactiveColor },
          ]}
        >
          Add Customer
        </Text>
      </TouchableOpacity>

      {/* 3. Notifications */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => console.log('Notifi Pressed')}
      >
        <Image
          source={require('../../assests/Notification.png')}
          style={[styles.navIconImage, { tintColor: inactiveColor }]}
        />
        <Text style={styles.navText}>Notifications</Text>
      </TouchableOpacity>

      {/* 4. Profile */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => console.log('Profile Pressed')}
      >
        <Image
          source={require('../../assests/Profile.png')}
          style={[styles.navIconImage, { tintColor: inactiveColor }]}
        />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 80,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  navText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default NavHomeAddNotifiProfile;
