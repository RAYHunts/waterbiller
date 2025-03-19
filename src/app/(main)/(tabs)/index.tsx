import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import useAuthStore from '@/store/authStore';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { session } = useAuthStore();

  const totalCustomers = 120;
  const totalIncome = '$12,500';

  const tasks = [
    {
      id: 1,
      type: 'Meter Device Installation',
      status: 'Assigned',
      assignedTo: 'John Doe',
      doneBy: null,
    },
    {
      id: 2,
      type: 'Request Payment to Customer',
      status: 'Done',
      assignedTo: 'Jane Smith',
      doneBy: 'Jane Smith',
    },
    {
      id: 3,
      type: 'Meter Device Installation',
      status: 'Open',
      assignedTo: null,
      doneBy: null,
    },
    {
      id: 4,
      type: 'Request Payment to Customer',
      status: 'Assigned',
      assignedTo: 'Alice Johnson',
      doneBy: null,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText style={styles.welcomeText}>
              Welcome, {session?.user.user_metadata.first_name}!
            </ThemedText>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <MaterialIcons name="people" size={24} color="#4CAF50" />
              <Text style={styles.statValue}>{totalCustomers}</Text>
              <Text style={styles.statLabel}>Total Customers</Text>
            </View>

            <View style={styles.statCard}>
              <MaterialIcons name="attach-money" size={24} color="#2196F3" />
              <Text style={styles.statValue}>{totalIncome}</Text>
              <Text style={styles.statLabel}>Total Income</Text>
            </View>
          </View>

          {/* Task List */}
          <View style={styles.tasksContainer}>
            <Text style={styles.sectionTitle}>Task List</Text>
            {tasks.map((task) => (
              <View key={task.id} style={styles.taskCard}>
                <Text style={styles.taskType}>{task.type}</Text>
                <View style={styles.taskDetails}>
                  <Text style={styles.taskStatus}>Status: {task.status}</Text>
                  {task.assignedTo && (
                    <Text style={styles.taskInfo}>Assigned To: {task.assignedTo}</Text>
                  )}
                  {task.doneBy && <Text style={styles.taskInfo}>Done By: {task.doneBy}</Text>}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  tasksContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  taskDetails: {
    marginTop: 5,
  },
  taskStatus: {
    fontSize: 14,
    color: '#666',
  },
  taskInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
});
