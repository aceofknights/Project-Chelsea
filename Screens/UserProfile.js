import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const UserProfile = () => {
  const [name] = useState('Chelsea');
  const [location, setLocation] = useState('Knoxville');
  const [jobTitle, setJobTitle] = useState('Bartender');
  const [hours, setHours] = useState('9-5 shift');
  const [certifications, setCertifications] = useState(['Bartending License']);
  const [profilePic, setProfilePic] = useState(require('../assets/dog picture.png')); // Sample profile picture
  const [editing, setEditing] = useState(false); // New state for editing mode

  const handleEditButton = () => {
    setEditing(true);
  };

  const handleSaveButton = () => {
    // Logic to save updated information
    setEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image source={profilePic} style={styles.profilePic} />
          <Text style={styles.name}>{name}</Text>
        </View>
        {editing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={handleEditButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Location */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        {editing ? (
          <TextInput
            style={styles.editInput}
            value={location}
            onChangeText={setLocation}
          />
        ) : (
          <Text style={styles.infoText}>{location}</Text>
        )}
      </View>
      {/* Job Title */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job Title</Text>
        {editing ? (
          <TextInput
            style={styles.editInput}
            value={jobTitle}
            onChangeText={setJobTitle}
          />
        ) : (
          <Text style={styles.infoText}>{jobTitle}</Text>
        )}
      </View>
      {/* Hours */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hours</Text>
        {editing ? (
          <TextInput
            style={styles.editInput}
            value={hours}
            onChangeText={setHours}
          />
        ) : (
          <Text style={styles.infoText}>{hours}</Text>
        )}
      </View>
      {/* Certifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Certifications</Text>
        {certifications.map((cert, index) => (
          <TextInput
            key={index}
            style={styles.editInput}
            value={cert}
            onChangeText={(text) => {
              const updatedCerts = [...certifications];
              updatedCerts[index] = text;
              setCertifications(updatedCerts);
            }}
          />
        ))}
        {/* Add certification input */}
        {editing && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setCertifications([...certifications, ''])}
          >
            <Text style={styles.addButtonText}>Add Certification</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fef4fo',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#331507',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#331507',
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#ef8833',
    borderRadius: 5,
  },
  editButtonText: {
    color: '#331507',
    fontSize: 16,
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#27ae60',
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#331507',
    fontSize: 16,
  },
  section: {
    backgroundColor: '#ef8833',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#331507',

  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#331507',

  },
  certificationText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#331507',

  },
  certificationInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
});

export default UserProfile;
