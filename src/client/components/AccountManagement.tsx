import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface AccountManagementProps {
  isVisible: boolean;
  onClose: () => void;
}

const AccountManagement: React.FC<AccountManagementProps> = ({ isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <View style={styles.notificationBox}>
              <View style={styles.headerContainer}>
                <Text style={styles.header}>Jameel Kekana</Text>
                <TouchableOpacity onPress={onClose}>
                  <Icon name="close" size={20} color="gray" />
                </TouchableOpacity>
              </View>
              <Text style={styles.userEmail}>Jameelk@qurtubaonline.co.za</Text>
              <View style={styles.horizontalLine} />
              <TouchableOpacity style={styles.accountItem}>
                <Icon name="user" size={20} color="grey" />
                <Text style={styles.accountText}>Account Management</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.accountItem}>
                <Icon name="sign-out" size={20} color="grey" />
                <Text style={styles.accountText}>Logout</Text>
              </TouchableOpacity>
            </View>
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
  },
  container: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 250,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1000,
    borderRadius: 10,
  },
  notificationBox: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555555',
  },
  userEmail: {
    fontSize: 14,
    color: 'gray',
    marginTop: 10,
  },
  horizontalLine: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  accountText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
});

export default AccountManagement;
