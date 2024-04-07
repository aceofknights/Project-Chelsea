import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, Modal } from 'react-native';
import moment from 'moment-timezone';
import StarRating from './StarRating';

const HistoryPage = () => {
  const [incomeType, setIncomeType] = useState('daily');
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0); // State to store total income

  useEffect(() => {
    generateShifts();
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    // Calculate total income whenever income type or shifts change
    setTotalIncome(calculateIncome());
  }, [incomeType, shifts]);

  const generateShifts = () => {
    const newShifts = [
      { id: 1, date: moment.tz('2023-11-05', 'UTC'), hoursWorked: 8},
    { id: 2, date: moment.tz('2023-11-17', 'UTC'), hoursWorked: 7},
    { id: 3, date: moment.tz('2023-11-27', 'UTC'), hoursWorked: 8},
    { id: 4, date: moment.tz('2023-12-10', 'UTC'), hoursWorked: 9},
    { id: 5, date: moment.tz('2023-12-23', 'UTC'), hoursWorked: 8},
    { id: 6, date: moment.tz('2024-01-04', 'UTC'), hoursWorked: 7},
    { id: 7, date: moment.tz('2024-01-16', 'UTC'), hoursWorked: 6},
    { id: 8, date: moment.tz('2024-01-28', 'UTC'), hoursWorked: 9},
    { id: 9, date: moment.tz('2024-02-08', 'UTC'), hoursWorked: 8},
    { id: 10, date: moment.tz('2024-02-20', 'UTC'), hoursWorked: 7},
    { id: 11, date: moment.tz('2024-02-28', 'UTC'), hoursWorked: 6},
    { id: 12, date: moment.tz('2024-02-29', 'UTC'), hoursWorked: 7},
    { id: 13, date: moment.tz('2024-03-01', 'UTC'), hoursWorked: 8},
    { id: 14, date: moment.tz('2024-03-02', 'UTC'), hoursWorked: 6},
    { id: 15, date: moment.tz('2024-03-03', 'UTC'), hoursWorked: 9},
    { id: 16, date: moment.tz('2024-04-01', 'UTC'), hoursWorked: 9},
      // Add other shifts here...
    ].map(shift => ({ ...shift, ...generateWagesAndTips() }));

    setShifts(newShifts);
  };

  const generateWagesAndTips = () => {
    const wages = Math.floor(Math.random() * 50) + 50;
    const tips = Math.floor(Math.random() * 20);
    const income = Math.floor(wages + tips);
    return { wages, tips, income };
  };

  const calculateIncome = () => {
    let totalIncome = 0;
    const currentDate = moment().tz('UTC').startOf('day');

    if (incomeType === 'daily') {
      totalIncome = calculateDailyIncome(currentDate);
    } else if (incomeType === 'weekly') {
      const lastSunday = getPreviousSunday(currentDate);
      totalIncome = calculateWeeklyIncome(lastSunday, currentDate);
    } else if (incomeType === 'monthly') {
      const monthStart = moment().tz('UTC').startOf('month');
      const monthShifts = shifts.filter((shift) => shift.date.isBetween(monthStart, currentDate, null, '[]'));
      totalIncome = monthShifts.reduce((acc, shift) => acc + shift.wages + shift.tips, 0);
    } else if (incomeType === 'yearly') {
      const yearStart = moment().tz('UTC').startOf('year');
      const yearShifts = shifts.filter((shift) => shift.date.isBetween(yearStart, currentDate, null, '[]'));
      totalIncome = yearShifts.reduce((acc, shift) => acc + shift.wages + shift.tips, 0);
    }

    return totalIncome;
  };

  const calculateDailyIncome = (date) => {
    const currentShift = shifts.find((shift) => shift.date.isSame(date, 'day'));
    return currentShift ? currentShift.wages + currentShift.tips : 0;
  };

  const calculateWeeklyIncome = (weekStart, weekEnd) => {
    const weekShifts = shifts.filter((shift) => shift.date.isBetween(weekStart, weekEnd, null, '[]') || shift.date.isSame(weekStart, 'day'));
    const weeklyIncome = weekShifts.reduce((acc, shift) => acc + shift.wages + shift.tips, 0);
    return weeklyIncome;
  };

  const getPreviousSunday = (date) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const lastSunday = new Date(today.getTime() - (dayOfWeek * 24 * 60 * 60 * 1000));
    return lastSunday;
  };

  const handleIncomeTypeChange = (type) => {
    setIncomeType(type);
  };

  const handleRateShift = (shiftId, rating) => {
    const updatedShifts = shifts.map((shift) =>
      shift.id === shiftId ? { ...shift, rating } : shift
    );
    setShifts(updatedShifts);
  };

  const handleShiftPress = (shift) => {
    setSelectedShift(shift);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.incomeContainer}>
        <Text style={styles.incomeLabel}>Total Income</Text>
        <Text style={styles.incomeValue}>${totalIncome}</Text>
        <View style={styles.incomeButtons}>
          <Button color="#ef8833" title="Daily" onPress={() => handleIncomeTypeChange('daily')} />
          <Button color="#ef8833" title="Weekly" onPress={() => handleIncomeTypeChange('weekly')} />
          <Button color="#ef8833" title="Monthly" onPress={() => handleIncomeTypeChange('monthly')} />
          <Button color="#ef8833" title="Yearly" onPress={() => handleIncomeTypeChange('yearly')} />
        </View>
      </View>

      {shifts.length > 0 ? (
        shifts.map((shift) => (
          <View key={shift.id} style={styles.shiftContainer}>
            <Text style={styles.shiftLabel}>Shift {shift.id}</Text>
            <Text>Date: {shift.date.format('YYYY-MM-DD')}</Text>
            <Text>Hours Worked: {shift.hoursWorked}</Text>
            <Text>Income Earned: ${shift.income}</Text>
            <Text>Rating:</Text>
            <StarRating
              rating={shift.rating}
              onRate={(rating) => handleRateShift(shift.id, rating)}
            />
            <Button title="Details" onPress={() => handleShiftPress(shift)} />
          </View>
        ))
      ) : (
        <Text style={styles.emptyState}>No shifts available.</Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Shift Details</Text>
            <Text>Date: {selectedShift?.date.format('YYYY-MM-DD')}</Text>
            <Text>Hours Worked: {selectedShift?.hoursWorked}</Text>
            <Text>Wages Earned: ${selectedShift?.wages}</Text>
            <Text>Tips Earned: ${selectedShift?.tips}</Text>
          </View>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FEF4F0',
  },
  incomeContainer: {
    marginBottom: 20,
  },
  incomeLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  incomeValue: {
    fontSize: 24,
    marginBottom: 10,
    color: 'green',
  },
  incomeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'green',
  },
  shiftContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  shiftLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptyState: {
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HistoryPage;