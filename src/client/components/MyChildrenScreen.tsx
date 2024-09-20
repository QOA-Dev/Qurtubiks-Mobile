import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyChildrenScreen = () => {
  return (
    <View style={styles.container}>
      <Text>My Children Screen</Text>
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

export default MyChildrenScreen;
