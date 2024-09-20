import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const  FeesDue: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fees Due</Text>
      <Text style={styles.text}>No data yet...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default FeesDue;
