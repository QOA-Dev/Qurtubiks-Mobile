import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MyChildren: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Children</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Manage children</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'rgb(236, 127, 85)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default MyChildren;
