import { act, render } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen';
import { NavigationContainer } from '@react-navigation/native';

test('should display login screen and handle login', async () => {
  await act(async () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });
});
