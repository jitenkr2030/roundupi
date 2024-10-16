import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  Alert,
} from 'react-native';
import { ProgressBar } from 'react-native-paper'; // You'll need to install this library

const SavingsGoalsScreen = () => {
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [editingGoalIndex, setEditingGoalIndex] = useState(null);

  const addOrUpdateGoal = () => {
    if (!goalTitle || !targetAmount || !targetDate) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const newGoal = {
      title: goalTitle,
      targetAmount: parseFloat(targetAmount),
      currentSavings: 0, // Initialize with 0 or set according to your logic
      targetDate: targetDate,
    };

    if (editingGoalIndex !== null) {
      const updatedGoals = [...goals];
      updatedGoals[editingGoalIndex] = newGoal;
      setGoals(updatedGoals);
      setEditingGoalIndex(null);
    } else {
      setGoals([...goals, newGoal]);
    }

    resetForm();
  };

  const resetForm = () => {
    setModalVisible(false);
    setGoalTitle('');
    setTargetAmount('');
    setTargetDate('');
  };

  const editGoal = (index) => {
    const goalToEdit = goals[index];
    setGoalTitle(goalToEdit.title);
    setTargetAmount(goalToEdit.targetAmount.toString());
    setTargetDate(goalToEdit.targetDate);
    setEditingGoalIndex(index);
    setModalVisible(true);
  };

  const deleteGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  const renderGoal = ({ item, index }) => (
    <View style={styles.goalCard}>
      <Text style={styles.goalTitle}>{item.title}</Text>
      <ProgressBar
        progress={item.currentSavings / item.targetAmount}
        color={item.currentSavings >= item.targetAmount ? 'green' : 'orange'}
        style={styles.progressBar}
      />
      <Text style={styles.goalInfo}>
        Current: ₹{item.currentSavings} / Target: ₹{item.targetAmount}
      </Text>
      <Text style={styles.goalDate}>Target Date: {item.targetDate}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => editGoal(index)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteGoal(index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Savings Goals</Text>
      {goals.length === 0 ? (
        <Text style={styles.noGoalsMessage}>
          No goals set yet. Create your first savings goal!
        </Text>
      ) : (
        <FlatList
          data={goals}
          renderItem={renderGoal}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <TouchableOpacity
        style={styles.createGoalButton}
        onPress={() => {
          resetForm();
          setModalVisible(true);
        }}
      >
        <Text style={styles.createGoalButtonText}>+ Create New Goal</Text>
      </TouchableOpacity>
      
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {editingGoalIndex !== null ? 'Edit Goal' : 'Create New Goal'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Goal Title"
            value={goalTitle}
            onChangeText={setGoalTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Target Amount"
            keyboardType="numeric"
            value={targetAmount}
            onChangeText={setTargetAmount}
          />
          <TextInput
            style={styles.input}
            placeholder="Target Date (YYYY-MM-DD)"
            value={targetDate}
            onChangeText={setTargetDate}
          />
          <Button title="Save Goal" onPress={addOrUpdateGoal} />
          <Button title="Cancel" onPress={resetForm} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  goalCard: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginVertical: 8,
  },
  goalInfo: {
    fontSize: 14,
  },
  goalDate: {
    fontSize: 12,
    color: '#6c757d',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    color: 'blue',
  },
  deleteButton: {
    color: 'red',
  },
  createGoalButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  createGoalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  noGoalsMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6c757d',
    marginVertical: 50,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
  },
});

export default SavingsGoalsScreen;
