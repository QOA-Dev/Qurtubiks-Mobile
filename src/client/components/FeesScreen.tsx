import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyChildren from './Home-MyChildren';
import FeesDue from './Fees-FeesDue';

const FeesScreen = () => {
  const [activeTab, setActiveTab] = useState('Fees');

  const renderContent = () => {
    switch (activeTab) {
      case 'Fees':
        return (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.blocksContainer}>
              <View style={styles.block}>
                <View style={styles.square}>
                  <Text style={styles.blockTitle}>Due:</Text>
                  <View style={styles.amountContainer}>
                    <Text style={styles.blockAmount}>0 ZAR</Text>
                    <Icon name="dollar" size={20} color="rgb(236, 127, 85)" />
                  </View>
                </View>
              </View>
              <View style={styles.block}>
                <View style={styles.square}>
                  <Text style={styles.blockTitle}>Paid:</Text>
                  <View style={styles.amountContainer}>
                    <Text style={styles.blockAmount}>0 ZAR</Text>
                    <Icon name="check" size={20} color="rgb(236, 127, 85)" />
                  </View>
                </View>
              </View>
            </View>
            <MyChildren />
            <FeesDue />
          </ScrollView>
        );
      case 'Payment Method':
        return (
          <View style={styles.paymentMethodContent}>
            <Text style={styles.paymentMethodTitle}>Manage Payment Methods</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Payment Method</Text>
            </TouchableOpacity>
            <Text style={styles.adminFeeText}>R5 Admin fee for card addition.</Text>
            <Text style={styles.someText}>
              Add, update, or remove payment methods.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fees</Text>
      <View style={styles.header}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Fees' && styles.activeTab]}
            onPress={() => setActiveTab('Fees')}>
            <Text style={styles.tabText}>Fees</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Payment Method' && styles.activeTab]}
            onPress={() => setActiveTab('Payment Method')}>
            <Text style={styles.tabText}>Payment Method</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F9FAFC',
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 18,
    color: 'grey',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(236, 127, 85)',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  blocksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  block: {
    marginBottom: 20,
  },
  square: {
    width: 150,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgb(236, 127, 85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blockAmount: {
    fontSize: 16,
    marginRight: 5,
  },
  paymentMethodContent: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  paymentMethodTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'rgb(236, 127, 85)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  adminFeeText: {
    marginBottom: 10,
  },
  someText: {
    fontSize: 16,
    color: 'grey',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default FeesScreen;
