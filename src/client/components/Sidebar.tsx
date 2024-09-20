import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onItemClick }) => {
  const navigation = useNavigation();

  if (!isOpen) {
    return null;
  }

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen);
    onClose();
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={[styles.container, isOpen ? styles.open : styles.closed]}>
            <Image source={require('../assets/qurtubiks-logo.png')} style={[styles.logo, { resizeMode: 'contain' }]} />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="close" size={20} color="#cdd0dc" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => handleNavigation('Home')}>
              <Icon name="th-large" size={20} color="#cdd0dc" />
              <Text style={[styles.itemText, { color: '#cdd0dc' }]}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => handleNavigation('Applications')}>
              <Icon name="paper-plane" size={20} color="#cdd0dc" />
              <Text style={[styles.itemText, { color: '#cdd0dc' }]}>Applications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => handleNavigation('News')}>
              <Icon name="star" size={20} color="#cdd0dc" />
              <Text style={[styles.itemText, { color: '#cdd0dc' }]}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => handleNavigation('Fees')}>
              <Icon name="credit-card" size={20} color="#cdd0dc" />
              <Text style={[styles.itemText, { color: '#cdd0dc' }]}>Fees</Text>
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
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: '100%',
    backgroundColor: '#1C2536',
    zIndex: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  open: {
    left: 0,
  },
  closed: {
    left: -200,
  },
  logo: {
    width: 150,
    height: 100,
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeText: {
    color: '#cdd0dc',
    fontSize: 18,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  itemText: {
    marginLeft: 10,
    textAlign: 'left',
  },
});

export default Sidebar;
