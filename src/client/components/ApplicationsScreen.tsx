import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ApplicationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Applications Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFC',
  },
});

export default ApplicationsScreen;
