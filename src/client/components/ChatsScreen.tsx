import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatsScreen = () => {
  const [activeTab, setActiveTab] = useState('All');

  const renderMessages = () => {
    switch (activeTab) {
      case 'All':
        return <Text style={styles.message}>No chats in All.</Text>;
      case 'Groups':
        return <Text style={styles.message}>No chats in Groups.</Text>;
      case 'Direct':
        return <Text style={styles.message}>No chats in Direct.</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chats</Text>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" size={20} color="grey" />
          <Text style={styles.addButtonText}>Create Message</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="grey" style={styles.searchIcon} />
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          placeholderTextColor="grey"
        />
      </View>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'All' && styles.activeTab]}
          onPress={() => setActiveTab('All')}>
          <Text style={styles.tabText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Groups' && styles.activeTab]}
          onPress={() => setActiveTab('Groups')}>
          <Text style={styles.tabText}>Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Direct' && styles.activeTab]}
          onPress={() => setActiveTab('Direct')}>
          <Text style={styles.tabText}>Direct</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.messagesContainer}>
        {renderMessages()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'grey',
    marginLeft: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    fontSize: 16,
    color: 'black',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'rgb(236, 127, 85)',
  },
  tabText: {
    fontSize: 16,
    color: 'grey',
  },
  messagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 10,
  },
});

export default ChatsScreen;
