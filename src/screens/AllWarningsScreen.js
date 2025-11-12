import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import WarningCard from '../components/WarningCard';

export default function AllWarningsScreen({ navigation }) {
  
  // 📋 FAKE DATA - 15 warnings (more than HomeScreen)
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
    },
    {
      id: 6,
      title: "Online Shopping Scam",
      description: "Fake websites selling products at too-good-to-be-true prices that never deliver.",
      category: "Shopping"
    },
    {
      id: 7,
      title: "Investment Fraud",
      description: "Promises of high returns with zero risk - classic Ponzi scheme warning signs.",
      category: "Investment"
    },
    {
      id: 8,
      title: "Tech Support Scam",
      description: "Pop-ups claiming your computer is infected, asking you to call a fake support number.",
      category: "Tech"
    },
    {
      id: 9,
      title: "Romance Scam Alert",
      description: "Online dating profiles that build relationships then ask for money for emergencies.",
      category: "Romance"
    },
    {
      id: 10,
      title: "Lottery Scam",
      description: "Notifications claiming you won a lottery you never entered, asking for fees upfront.",
      category: "Lottery"
    },
    {
      id: 11,
      title: "Job Offer Scam",
      description: "Fake job postings asking for personal information or upfront payment for training.",
      category: "Employment"
    },
    {
      id: 12,
      title: "Charity Scam",
      description: "Fake charities collecting donations after disasters or emergencies.",
      category: "Charity"
    },
    {
      id: 13,
      title: "Rental Property Scam",
      description: "Properties listed at low prices requiring deposits before viewing.",
      category: "Housing"
    },
    {
      id: 14,
      title: "Cryptocurrency Scam",
      description: "Fake crypto investment platforms promising guaranteed returns.",
      category: "Crypto"
    },
    {
      id: 15,
      title: "Insurance Scam",
      description: "Fake insurance agents selling policies from non-existent companies.",
      category: "Insurance"
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
        <Text style={styles.title}>All Scam Warnings</Text>
        <Text style={styles.subtitle}>{warnings.length} warnings available</Text>
      </View>
      
      {/* WARNINGS LIST */}
      <FlatList
        data={warnings}
        renderItem={renderWarningItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      
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
    paddingTop: 20,
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
    paddingBottom: 30,
  },
});