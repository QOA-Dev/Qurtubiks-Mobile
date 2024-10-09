import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

interface NavbarProps {
  onBurgerClick: () => void;
  isOpen: boolean; 
  toggleNotifications: () => void;
  toggleAccountManagement: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onBurgerClick,
  isOpen, 
  toggleNotifications,
  toggleAccountManagement,
}) => {
  const navigation = useNavigation();

  const handleChatsNavigation = () => {
    // @ts-ignore
    navigation.navigate('Chats');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBurgerClick} style={styles.burger}>
        <Icon name={isOpen ? 'close' : 'bars'} size={28} color="#BDBDBD" /> 
      </TouchableOpacity>

      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.icon} onPress={toggleNotifications}>
          <Icon name="bell" size={28} color="#BDBDBD" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={handleChatsNavigation}>
          <Icon name="comment" size={28} color="#BDBDBD" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={toggleAccountManagement}>
          <Icon name="user" size={28} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F9F9F9',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 1, 
  },
  burger: {
    padding: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '78%', 
  },
  icon: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Navbar;
