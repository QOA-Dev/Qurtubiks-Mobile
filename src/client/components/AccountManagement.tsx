import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { useAuth } from '../context/AuthProvider'; 

interface AccountManagementProps {
  isVisible: boolean;
  onClose: () => void;
}

const AccountManagement: React.FC<AccountManagementProps> = ({ isVisible, onClose }) => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      onClose(); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!isVisible) {
    return null;
  }

  const getInitials = (name: string) => {
    const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
    return initials;
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <Text style={styles.header}>My Profile</Text>

            <View style={styles.profileContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getInitials(user?.name || 'NN')}</Text>
              </View>

              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>{user?.name}</Text>
                <Text style={styles.profileEmail}>{user?.email}</Text>
              </View>
            </View>

            <View style={styles.horizontalLine} />

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  container: {
    position: 'absolute',
    top: '20%',
    left: '5%',
    right: '5%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  profileEmail: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  horizontalLine: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#EC7F55',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AccountManagement;
