import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Text, View } from 'react-native'; 
import * as SecureStore from 'expo-secure-store';
import Auth0 from 'react-native-auth0'; 
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE } from '@env';

const auth0 = new Auth0({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
});

interface AuthContextProps {
  user: any;
  token: string | null;
  loading: boolean;
  loginWithCredentials: (email: string, password: string) => Promise<void>;
  loginGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to log in with credentials
  const loginWithCredentials = async (email: string, password: string) => {
    try {
      const response = await auth0.auth.passwordRealm({
        username: email,
        password: password,
        realm: 'Username-Password-Authentication',
        audience: AUTH0_AUDIENCE,
        scope: 'openid profile email',
      });

      const { accessToken } = response;
      setToken(accessToken);
      const userProfile = await fetchUserProfile(accessToken);

      setUser(userProfile);
      await SecureStore.setItemAsync('userToken', accessToken);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  };

  // Function to log in with Google OAuth
  const loginGoogle = async () => {
    try {
      const response = await auth0.webAuth.authorize({
        scope: 'openid profile email',
        audience: AUTH0_AUDIENCE,
        connection: 'google-oauth2',
      });

      const { accessToken } = response;
      setToken(accessToken);
      const userProfile = await fetchUserProfile(accessToken);

      setUser(userProfile);
      await SecureStore.setItemAsync('userToken', accessToken);
    } catch (error) {
      console.error('Google login failed:', error);
      throw new Error('Google login failed');
    }
  };

  // Function to fetch the user profile from Auth0
  const fetchUserProfile = async (token: string) => {
    try {
      const response = await auth0.auth.userInfo({ token });
      return response;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw error;
    }
  };

  // Function to log out the user and clear stored token
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Load stored token on app start to keep the user logged in
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('userToken');
        if (storedToken) {
          const userProfile = await fetchUserProfile(storedToken);
          setUser(userProfile);
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Failed to load token:', error);
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  const value: AuthContextProps = {
    user,
    token,
    loading,
    loginWithCredentials,
    loginGoogle,
    logout,
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
