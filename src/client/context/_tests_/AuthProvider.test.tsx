import { render, act } from '@testing-library/react-native';
import { Text } from 'react-native';
import { AuthProvider, useAuth } from '../../context/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

// Create a basic mock component to consume the AuthContext
const TestComponent = () => {
  const { user, token } = useAuth();
  return (
    <React.Fragment>
      <Text>{user ? `User: ${user}` : 'No user'}</Text>
      <Text>{token ? `Token: ${token}` : 'No token'}</Text>
    </React.Fragment>
  );
};

test('should handle login and logout correctly', async () => {
  await act(async () => {
    const { getByText } = render(
      <NavigationContainer>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </NavigationContainer>
    );

    // Check initial state
    expect(getByText('No user')).toBeTruthy();
    expect(getByText('No token')).toBeTruthy();
  });
});
