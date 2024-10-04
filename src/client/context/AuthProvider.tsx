import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Text, View } from 'react-native'; 
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import * as AuthSession from 'expo-auth-session';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE } from '@env';

console.log("Domain", AUTH0_DOMAIN);
console.log("Client", AUTH0_CLIENT_ID);
console.log("Audience", AUTH0_AUDIENCE);

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

  const loginWithCredentials = async (email: string, password: string) => {
    try {
      const response = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
        grant_type: 'password',
        username: email,
        password: password,
        client_id: AUTH0_CLIENT_ID,
        audience: AUTH0_AUDIENCE,
      });
  
      const { access_token } = response.data;
      setToken(access_token);
      const userProfile = await fetchUserProfile(access_token);
  
      setUser(userProfile);
  
      await SecureStore.setItemAsync('userToken', access_token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.response?.data || error.message);
      } else {
        console.error('Login failed:', error);
      }
      throw new Error('Login failed');
    }
  };
  

  const loginGoogle = async () => {
    try {
      const redirectUri = AuthSession.makeRedirectUri();
      const authUrl = `https://${AUTH0_DOMAIN}/authorize?client_id=${AUTH0_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid profile email&connection=google-oauth2`;

      // I need to reconfigure this 
      const result = await AuthSession.startAsync({ authUrl });
      if (result.type === 'success') {
        const { access_token } = result.params;
        setToken(access_token);
        const userProfile = await fetchUserProfile(access_token);

        // Directly setting PARENT_STUDENT.
        setUser(userProfile);

        // Store token in SecureStore
        await SecureStore.setItemAsync('userToken', access_token);
      } else {
        throw new Error('Google login failed');
      }
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  };

  const fetchUserProfile = async (token: string) => {
    const response = await axios.get(`https://${AUTH0_DOMAIN}/userinfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync('userToken');
      if (storedToken) {
        const userProfile = await fetchUserProfile(storedToken);
        setUser(userProfile);
        setToken(storedToken);
      }
      setLoading(false);
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
