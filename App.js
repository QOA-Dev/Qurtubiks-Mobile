import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import { AuthProvider, useAuth } from './src/client/context/AuthProvider';
import Sidebar from './src/client/components/Sidebar';
import HomeScreen from './src/client/components/HomeScreen';
import ApplicationsScreen from './src/client/components/ApplicationsScreen';
import MyChildrenScreen from './src/client/components/MyChildrenScreen';
import NewsScreen from './src/client/components/NewsScreen';
import FeesScreen from './src/client/components/FeesScreen';
import ChatsScreen from './src/client/components/ChatsScreen';
import LoginScreen from './src/client/components/LoginScreen';
import Navbar from './src/client/components/Navbar';
import NotificationsView from './src/client/components/Notifications';
import AccountManagement from './src/client/components/AccountManagement';

const Stack = createStackNavigator();

const AppContent = ({
  toggleSidebar,
  toggleNotifications,
  toggleAccountManagement,
  isNotificationsVisible,
  isAccountManagementVisible,
}) => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Applications" component={ApplicationsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MyChildren" component={MyChildrenScreen} options={{ headerShown: false }} />
            <Stack.Screen name="News" component={NewsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Fees" component={FeesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Chats" component={ChatsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Accounts" component={AccountManagement} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
      {user && (
        <Navbar
          onBurgerClick={toggleSidebar}
          toggleNotifications={toggleNotifications}
          toggleAccountManagement={toggleAccountManagement}
          isNotificationsVisible={isNotificationsVisible}
          isAccountManagementVisible={isAccountManagementVisible}
        />
      )}
    </View>
  );
};

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
  const [isAccountManagementVisible, setIsAccountManagementVisible] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef(null);
  const responseListener = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsVisible(!isNotificationsVisible);
  };

  const toggleAccountManagement = () => {
    setIsAccountManagementVisible(!isAccountManagementVisible);
  };

  // Push notifications, registrations
  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      let token;

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      const { status } = await Notifications.requestPermissionsAsync(); 
      if (status !== 'granted') {
        alert('Failed to get push token for push notifications!');
        return;
      }

      // I created an expo account, I will add to the README
      const projectId = 'cf0c6c78-3a9a-4a21-b6bb-bf693a072aff'; 

      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      setExpoPushToken(token);
      console.log('Expo Push Token:', token);
    };

    registerForPushNotificationsAsync();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification Received:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification Response:', response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppContent
          toggleSidebar={toggleSidebar}
          toggleNotifications={toggleNotifications}
          toggleAccountManagement={toggleAccountManagement}
          isNotificationsVisible={isNotificationsVisible}
          isAccountManagementVisible={isAccountManagementVisible}
        />
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <NotificationsView isVisible={isNotificationsVisible} onClose={toggleNotifications} />
        <AccountManagement isVisible={isAccountManagementVisible} onClose={toggleAccountManagement} />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
