import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

export const storeTokens = async (value: AuthTokens): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('session', jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getTokens = async (): Promise<AuthTokens | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem('session');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return null;
  }
};
