import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Applications from './Home-Applications';
import MyChildren from './Home-MyChildren';

const HomeScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.dashboardContainer}>
          <Text style={styles.title}>Dashboard</Text>
          <Image source={require('../assets/dashboard-header-img.png')} style={styles.image} />
          <Text style={styles.subtitle}>
            <Text style={styles.boldText}>Join the educational group today!</Text>
            {'\n'}
            To apply, click the button below and start your learning journey with us.
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => {/* handle button press */}}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Go to Applications</Text>
              <Icon name="angle-right" size={20} color="white" style={styles.buttonIcon} />
            </View>
          </TouchableOpacity>
        </View>
        <Applications />
        <MyChildren />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: 5,
    backgroundColor: '#F9FAFC',
  },
  mainContent: {
    width: '100%',
    alignItems: 'center',
  },
  dashboardContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  boldText: {
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
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginLeft: 5,
  },
});

export default HomeScreen;