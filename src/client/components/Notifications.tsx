import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface NotificationsProps {
  isVisible: boolean;
  onClose: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ isVisible, onClose }) => {
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
                <Text style={styles.header}>Notifications</Text>
                <TouchableOpacity onPress={onClose}>
                  <Icon name="close" size={20} color="gray" />
                </TouchableOpacity>
              </View>
              <Text style={styles.noNotifications}>No notifications yet</Text>
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
    zIndex: 2000,
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
  noNotifications: {
    fontSize: 14,
    color: 'gray',
    marginTop: 10,
  },
});

export default Notifications;
