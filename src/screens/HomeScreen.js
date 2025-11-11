import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      
      <Button 
        title="Go to All Warnings" 
        onPress={() => navigation.navigate('AllWarnings')} 
      />
      
      <View style={styles.spacing} />
      
      <Button 
        title="Go to Warning Detail" 
        onPress={() => navigation.navigate('WarningDetail')} 
      />
      
      <View style={styles.spacing} />
      
      <Button 
        title="Go to Auth" 
        onPress={() => navigation.navigate('Auth')} 
      />
      
      <View style={styles.spacing} />
      
      <Button 
        title="Add Warning" 
        onPress={() => navigation.navigate('AddWarning')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 30 
  },
  spacing: {
    height: 15
  }
});