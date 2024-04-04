import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the star and gear icons

const UserProfile = () => {
  const [name] = useState('Chelsea');
  const [rating] = useState(4.9); // New state for rating
  const [location, setLocation] = useState('Knoxville');
  const [jobTitle, setJobTitle] = useState('Bartender');
  const [hours, setHours] = useState('9-5 shift');
  const [certifications, setCertifications] = useState(['Bartending License']);
  const [previousExperiences, setPreviousExperiences] = useState(['Previous Experience 1', 'Previous Experience 2']); // New state for previous experiences
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
          <View style= {styles.nameStarContainer}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={20} color="blue" style={styles.starIcon} />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          </View>
        </View>
        {editing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={handleEditButton}>
            <Icon name="gear" size={20} color="blue" />
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
      {/* Previous Experiences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Previous Experiences</Text>
        {previousExperiences.map((experience, index) => (
          <TextInput
            key={index}
            style={styles.editInput}
            value={experience}
            onChangeText={(text) => {
              const updatedExperiences = [...previousExperiences];
              updatedExperiences[index] = text;
              setPreviousExperiences(updatedExperiences);
            }}
          />
        ))}
        {/* Add previous experience input */}
        {editing && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setPreviousExperiences([...previousExperiences, ''])}
          >
            <Text style={styles.addButtonText}>Add Experience</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef4fo',
  },
  header: {
    padding: 20,
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
  nameStarContainer: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#331507',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#331507',
    marginLeft: 5,
    fontSize: 18,
  },
  starIcon: {
    elevation: 5,
  },
  editButton: {
    padding: 10,
  },
  saveButton: {
    padding: 10,
  },
  section: {
    paddingHorizontal:20,
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
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
  editInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ef8833',
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#331507',
    fontSize: 16,
  },
});

export default UserProfile;