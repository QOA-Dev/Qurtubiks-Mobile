import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

interface NavbarProps {
  onBurgerClick: () => void;
  toggleNotifications: () => void;
  toggleAccountManagement: () => void;
  isNotificationsVisible: boolean;
  isAccountManagementVisible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  onBurgerClick,
  toggleNotifications,
  toggleAccountManagement,
  isNotificationsVisible,
  isAccountManagementVisible,
}) => {
  const navigation = useNavigation();

  const handleChatsNavigation = () => {
    // Navigate to the ChatsScreen
    navigation.navigate('Chats');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBurgerClick} style={styles.burger}>
        <Icon name="bars" size={24} color="grey" />
      </TouchableOpacity>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.icon} onPress={toggleNotifications}>
          <Icon name="bell" size={20} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={handleChatsNavigation}>
          <Icon name="envelope" size={20} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={toggleAccountManagement}>
          <Icon name="user-circle" size={20} color="grey" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
  },
  burger: {
    marginRight: 20,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
  },
});

export default Navbar;
