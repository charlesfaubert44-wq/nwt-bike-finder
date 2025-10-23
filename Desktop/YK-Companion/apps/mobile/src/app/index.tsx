import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Welcome to Yellowknife</Text>
        <Text style={styles.subtitle}>Plan Your Northern Adventure</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Aurora Viewing</Text>
          <Text style={styles.cardText}>
            Experience the spectacular Northern Lights with real-time forecasts and alerts.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Seasonal Activities</Text>
          <Text style={styles.cardText}>
            Discover activities perfect for every season - from summer adventures to winter experiences.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Trip Planning</Text>
          <Text style={styles.cardText}>
            Build your perfect itinerary with our smart planning tools and local insights.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    color: '#6b7280',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
  },
  cardText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});
