import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import WarningCard from '../components/WarningCard';

export default function HomeScreen({ navigation }) {
  
  // 📋 FAKE DATA - 5 warnings
  const warnings = [
    {
      id: 1,
      title: "Phone Call Scam Alert",
      description: "Beware of calls claiming to be from tax authorities demanding immediate payment.",
      category: "Phone"
    },
    {
      id: 2,
      title: "Email Phishing Attack",
      description: "Fake emails pretending to be from banks asking for password verification.",
      category: "Email"
    },
    {
      id: 3,
      title: "SMS Fraud Warning",
      description: "Suspicious text messages with links claiming you won a prize or package delivery.",
      category: "SMS"
    },
    {
      id: 4,
      title: "Bank Account Scam",
      description: "Scammers calling pretending to be bank security asking for card details.",
      category: "Banking"
    },
    {
      id: 5,
      title: "Social Media Impersonation",
      description: "Fake profiles impersonating friends or family asking for money urgently.",
      category: "Social Media"
    }
  ];

  // 🎯 Handle card press
  const handleWarningPress = (warningId) => {
    navigation.navigate('WarningDetail', { warningId: warningId });
  };

  // 🎨 Render each warning card
  const renderWarningItem = ({ item }) => (
    <WarningCard 
      warning={item}
      onPress={() => handleWarningPress(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      
     {/* HEADER */}
<View style={styles.header}>
  <Text style={styles.title}>Latest Scam Warnings</Text>
  <Text style={styles.subtitle}>Stay safe from scams</Text>
  
  {/* View All Button */}
  <TouchableOpacity 
    style={styles.viewAllButton}
    onPress={() => navigation.navigate('AllWarnings')}
  >
    <Text style={styles.viewAllText}>View All Warnings →</Text>
  </TouchableOpacity>
</View>
      
      {/* WARNINGS LIST */}
      <FlatList
        data={warnings}
        renderItem={renderWarningItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      
      {/* BOTTOM BUTTONS */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('Auth')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.registerButton}
          onPress={() => navigation.navigate('Auth')}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  // HEADER STYLES
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  
  // LIST STYLES
  listContent: {
    padding: 15,
  },
  
  // BUTTON STYLES
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 40,
    gap: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  registerButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});