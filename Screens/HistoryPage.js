import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Picker, CheckBox, Switch, Button, StyleSheet } from 'react-native';
import moment from 'moment-timezone';
import StarRating from './StarRating'; // Import your StarRating component

const HistoryPage = () => {
  const [incomeType, setIncomeType] = useState('daily');
  const [shifts, setShifts] = useState([
    { id: 1, date: moment.tz('2023-11-05', 'UTC'), hoursWorked: 8, moneyEarned: 100 },
    { id: 2, date: moment.tz('2023-11-17', 'UTC'), hoursWorked: 7, moneyEarned: 100 },
    { id: 3, date: moment.tz('2023-11-29', 'UTC'), hoursWorked: 6, moneyEarned: 100 },
    { id: 4, date: moment.tz('2023-12-10', 'UTC'), hoursWorked: 9, moneyEarned: 100 },
    { id: 5, date: moment.tz('2023-12-23', 'UTC'), hoursWorked: 8, moneyEarned: 100 },
    { id: 6, date: moment.tz('2024-01-04', 'UTC'), hoursWorked: 7, moneyEarned: 100 },
    { id: 7, date: moment.tz('2024-01-16', 'UTC'), hoursWorked: 6, moneyEarned: 100 },
    { id: 8, date: moment.tz('2024-01-28', 'UTC'), hoursWorked: 9, moneyEarned: 100 },
    { id: 9, date: moment.tz('2024-02-08', 'UTC'), hoursWorked: 8, moneyEarned: 50 },
    { id: 10, date: moment.tz('2024-02-20', 'UTC'), hoursWorked: 7, moneyEarned: 50 },
    { id: 11, date: moment.tz('2024-02-28', 'UTC'), hoursWorked: 6, moneyEarned: 50 },
    { id: 12, date: moment.tz('2024-02-29', 'UTC'), hoursWorked: 7, moneyEarned: 40 },
    { id: 13, date: moment.tz('2024-03-01', 'UTC'), hoursWorked: 8, moneyEarned: 30 },
    { id: 14, date: moment.tz('2024-03-02', 'UTC'), hoursWorked: 6, moneyEarned: 20 },
    { id: 15, date: moment.tz('2024-03-03', 'UTC'), hoursWorked: 9, moneyEarned: 10 },
    { id: 16, date: moment.tz('2024-03-04', 'UTC'), hoursWorked: 9, moneyEarned: 5 },

  ]);

  //handler for button clicks to update what income type is
  const handleIncomeTypeChange = (type) => {
    setIncomeType(type);
  };

  const handleRateShift = (shiftId, rating) => {
    // Update the rating of the shift with shiftId
    const updatedShifts = shifts.map((shift) =>
      shift.id === shiftId ? { ...shift, rating } : shift
    );
    setShifts(updatedShifts);
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
      totalIncome = monthShifts.reduce((acc, shift) => acc + shift.moneyEarned, 0);
    } else if (incomeType === 'yearly') {
      const yearStart = moment().tz('UTC').startOf('year');
      const yearShifts = shifts.filter((shift) => shift.date.isBetween(yearStart, currentDate, null, '[]'));
      totalIncome = yearShifts.reduce((acc, shift) => acc + shift.moneyEarned, 0);
    }
    return totalIncome;
  };

  const calculateDailyIncome = (date) => {
    const currentShift = shifts.find((shift) => shift.date.isSame(date, 'day'));
    if (currentShift) {
      return currentShift.moneyEarned;
    } else {
      return 0; // Handle case where no shift exists for the day
    }
  };

  const calculateWeeklyIncome = (weekStart, weekEnd) => {
    const weekShifts = shifts.filter((shift) => shift.date.isBetween(weekStart, weekEnd, null, '[]') || shift.date.isSame(weekStart, 'day'));
    const weeklyIncome = weekShifts.reduce((acc, shift) => acc + shift.moneyEarned, 0);
    return weeklyIncome;
  };

  const getPreviousSunday = (date) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const lastSunday = new Date(today.getTime() - (dayOfWeek * 24 * 60 * 60 * 1000));
    return lastSunday;
  };

  const totalIncome = calculateIncome();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.incomeContainer}>
        <Text style={styles.incomeLabel}>Total Income</Text>
        <Text style={styles.incomeValue}>${totalIncome}</Text>
        <View style={styles.incomeButtons}>
          <Button color="orange" title="Daily" onPress={() => handleIncomeTypeChange('daily')} />
          <Button color="orange" title="Weekly" onPress={() => handleIncomeTypeChange('weekly')} />
          <Button color="orange" title="Monthly" onPress={() => handleIncomeTypeChange('monthly')} />
          <Button color="orange" title="Yearly" onPress={() => handleIncomeTypeChange('yearly')} />
        </View>
      </View>

      {shifts.length > 0 ? (
        shifts.map((shift) => (
          <View key={shift.id} style={styles.shiftContainer}>
            <Text style={styles.shiftLabel}>Shift {shift.id}</Text>
            <Text>Date: {shift.date.format('YYYY-MM-DD')}</Text>
            <Text>Hours Worked: {shift.hoursWorked}</Text>
            <Text>Money Earned: ${shift.moneyEarned}</Text>
            <Text>Rating:</Text>
            <StarRating
              rating={shift.rating}
              onRate={(rating) => handleRateShift(shift.id, rating)}
            />
          </View>
        ))
      ) : (
        <Text style={styles.emptyState}>No shifts available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    color: 'orange',

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
});

export default HistoryPage;
