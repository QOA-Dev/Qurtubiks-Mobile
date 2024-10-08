import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { NEWS_API } from '@env';
const BASE_URL = NEWS_API;

// Fetch all news without filters
export const getAllNews = async (page = 1, pageSize = 6) => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    if (!token) {
      throw new Error('No token found, please log in.');
    }

    const response = await axios.get(BASE_URL, {
      params: { page, pageSize },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data?.data && response.data.data.length === 0) {
      console.warn("API returned empty data array, check the filtering parameters");
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
