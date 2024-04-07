import React, { useState } from 'react';
import { View, Text, TextInput, CheckBox, Modal, Button, Switch, ScrollView, StyleSheet, TouchableOpacity, Platform, DatePickerIOS, TimePickerAndroid } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the correct package
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook


const SearchPage = () => {
  const [zipcode, setZipcode] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [shiftDuration, setShiftDuration] = useState('');
  const [restaurantType, setRestaurantType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [shiftStatus, setShiftStatus] = useState('');
  const [languages, setLanguages] = useState('');
  const [certifications, setCertifications] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [shiftFrequency, setShiftFrequency] = useState('');
  const [tipSharing, setTipSharing] = useState(false);
  const [pay, setPay] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedHours, setSelectedHours] = useState('01');
  const [selectedMinutes, setSelectedMinutes] = useState('00');
  const [isPM, setIsPM] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const navigation = useNavigation();


  const handleSearch = () => {
    navigation.goBack(); // This will navigate back to the previous screen
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };


  const handleTimeChange = () => {
    setShowTimePicker(true);
  };

  const handlePickerCancel = () => {
    setShowTimePicker(false);
  };

  const handlePickerConfirm = () => {
    setShowTimePicker(false);
    const newTime = `${selectedHours}:${selectedMinutes} ${isPM ? 'PM' : 'AM'}`;
    setDate(new Date()); // Update the date to trigger re-render
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Zipcode</Text>
        <TextInput
          style={styles.input}
          value={zipcode}
          onChangeText={setZipcode}
          placeholder="Enter zipcode"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={styles.input}>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

     <TouchableOpacity style={styles.inputContainer} onPress={handleTimeChange}>
        <Text style={styles.label}>Time</Text>
        <Text style={styles.input}>{`${selectedHours}:${selectedMinutes} ${isPM ? 'PM' : 'AM'}`}</Text>
      </TouchableOpacity>
      <Modal visible={showTimePicker} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedHours}
                onValueChange={(itemValue) => setSelectedHours(itemValue)}
                style={styles.picker}
              >
                {[...Array(12).keys()].map((hour) => (
                  <Picker.Item key={hour} label={`${hour + 1}`} value={hour < 9 ? `0${hour + 1}` : `${hour + 1}`} />
                ))}
              </Picker>
              <Text style={styles.separator}>:</Text>
              <Picker
                selectedValue={selectedMinutes}
                onValueChange={(itemValue) => setSelectedMinutes(itemValue)}
                style={styles.picker}
              >
                {Array.from(Array(60).keys()).map((minute) => (
                  <Picker.Item key={minute} label={minute < 10 ? `0${minute}` : `${minute}`} value={minute < 10 ? `0${minute}` : `${minute}`} />
                ))}
              </Picker>
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>AM</Text>
              <Switch
                value={isPM}
                onValueChange={(value) => setIsPM(value)}
              />
              <Text style={styles.switchText}>PM</Text>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handlePickerCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePickerConfirm}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Job Role</Text>
        <Picker
          style={styles.input}
          selectedValue={jobRole}
          onValueChange={(itemValue) => setJobRole(itemValue)}
        >
          <Picker.Item label="Select Job Role" value="" />
          <Picker.Item label="Role 1" value="Role 1" />
          <Picker.Item label="Role 2" value="Role 2" />
          <Picker.Item label="Role 3" value="Role 3" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Shift Duration</Text>
        <Picker
          style={styles.input}
          selectedValue={shiftDuration}
          onValueChange={(itemValue) => setShiftDuration(itemValue)}
        >
          <Picker.Item label="Select Shift Duration" value="" />
          {[...Array(12).keys()].map((value) => (
            <Picker.Item key={value} label={`${value + 1}`} value={`${value + 1}`} />
          ))}
        </Picker>
      </View>


      <View style={styles.inputContainer}>
        <Text style={styles.label}>Restaurant Type</Text>
        <Picker
          style={styles.input}
          selectedValue={restaurantType}
          onValueChange={(itemValue) => setRestaurantType(itemValue)}
        >
          <Picker.Item label="Select Restaurant Type" value="" />
          <Picker.Item label="Type 1" value="Type 1" />
          <Picker.Item label="Type 2" value="Type 2" />
          <Picker.Item label="Type 3" value="Type 3" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Experience Level</Text>
        <Picker
          style={styles.input}
          selectedValue={experienceLevel}
          onValueChange={(itemValue) => setExperienceLevel(itemValue)}
        >
          <Picker.Item label="Select Experience Level" value="" />
          <Picker.Item label="Level 1" value="Level 1" />
          <Picker.Item label="Level 2" value="Level 2" />
          <Picker.Item label="Level 3" value="Level 3" />
        </Picker>
      </View>


      <View style={styles.inputContainer}>
        <Text style={styles.label}>Shift Status</Text>
        <TextInput
          style={styles.input}
          value={shiftStatus}
          onChangeText={setShiftStatus}
          placeholder="Enter Shift Status"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Languages</Text>
        <TextInput
          style={styles.input}
          value={languages}
          onChangeText={setLanguages}
          placeholder="Enter Languages"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Certifications</Text>
        <TextInput
          style={styles.input}
          value={certifications}
          onChangeText={setCertifications}
          placeholder="Enter Certifications"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Special Requirements</Text>
        <TextInput
          style={styles.input}
          value={specialRequirements}
          onChangeText={setSpecialRequirements}
          placeholder="Enter Special Requirements"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Shift Frequency</Text>
        <TextInput
          style={styles.input}
          value={shiftFrequency}
          onChangeText={setShiftFrequency}
          placeholder="Enter Shift Frequency"
        />
      </View>

      <Text>Tip Sharing</Text>
      <Switch
        value={tipSharing}
        onValueChange={setTipSharing}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pay</Text>
        <TextInput
          style={styles.input}
          value={pay}
          onChangeText={setPay}
          placeholder="Enter Pay"
        />
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
    </ScrollView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  searchButton: {
    backgroundColor: 'orange',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 50,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    padding: 20,
    backgroundColor: '#FEF4F0',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    minWidth: 300,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    flex: 1,
    height: 200,
  },
  separator: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  switchText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  buttonText: {
    color: '#007bff',
    fontSize: 16,
    marginRight: 20,
  },
});

