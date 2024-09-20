import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Sidebar from './src/client/components/Sidebar';
import HomeScreen from './src/client/components/HomeScreen';
import ApplicationsScreen from './src/client/components/ApplicationsScreen';
import MyChildrenScreen from './src/client/components/MyChildrenScreen';
import NewsScreen from './src/client/components/NewsScreen';
import FeesScreen from './src/client/components/FeesScreen';
import ChatsScreen from './src/client/components/ChatsScreen';
import Navbar from './src/client/components/Navbar'; 
import Notifications from './src/client/components/Notifications'; 
import AccountManagement from './src/client/components/AccountManagement'; 

const Stack = createStackNavigator();

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [view, setView] = useState('Dashboard');
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
  const [isAccountManagementVisible, setIsAccountManagementVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleItemClick = (item) => {
    setView(item);
    setIsSidebarOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsVisible(!isNotificationsVisible);
  };

  const toggleAccountManagement = () => {
    setIsAccountManagementVisible(!isAccountManagementVisible);
  };

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Navbar
          onBurgerClick={toggleSidebar}
          toggleNotifications={toggleNotifications}
          toggleAccountManagement={toggleAccountManagement}
          isNotificationsVisible={isNotificationsVisible}
          isAccountManagementVisible={isAccountManagementVisible}
        />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Applications" component={ApplicationsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MyChildren" component={MyChildrenScreen} options={{ headerShown: false }} />
          <Stack.Screen name="News" component={NewsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Fees" component={FeesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Chats" component={ChatsScreen} options={{ headerShown: false }} />
          
        </Stack.Navigator>

        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} onItemClick={handleItemClick} />
        <Notifications isVisible={isNotificationsVisible} onClose={toggleNotifications} />
        <AccountManagement isVisible={isAccountManagementVisible} onClose={toggleAccountManagement} />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

// Testing GIT SSH Keys
