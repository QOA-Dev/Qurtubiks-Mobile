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
    // @ts-ignore
    navigation.navigate(screen);
    onClose();
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={[styles.container, isOpen ? styles.open : styles.closed]}>
            <Image source={require('../../../assets/qurtubiks-logo2.png')} style={[styles.logo, { resizeMode: 'contain' }]} />
            
            <TouchableOpacity style={styles.item} onPress={() => handleNavigation('Home')}>
              <Icon name="th-large" size={20} color="#fff" />
              <Text style={styles.itemText}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => handleNavigation('Applications')}>
              <Icon name="paper-plane" size={20} color="#fff" />
              <Text style={styles.itemText}>Applications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => handleNavigation('News')}>
              <Icon name="star" size={20} color="#fff" />
              <Text style={styles.itemText}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => handleNavigation('Fees')}>
              <Icon name="credit-card" size={20} color="#fff" />
              <Text style={styles.itemText}>Fees</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => handleNavigation('Children')}>
              <Icon name="child" size={20} color="#fff" />
              <Text style={styles.itemText}>My Children</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => handleNavigation('Settings')}>
              <Icon name="cog" size={20} color="#fff" />
              <Text style={styles.itemText}>Settings</Text>
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
    bottom: 70,
    zIndex: 2, 
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250, 
    height: '100%',
    backgroundColor: '#052143',
    zIndex: 3, 
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
    left: -250,  
  },
  logo: {
    width: 150,
    height: 100,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 20
  },
  itemText: {
    marginLeft: 10,
    textAlign: 'left',
    color: '#cdd0dc',
  },
});

export default Sidebar;
