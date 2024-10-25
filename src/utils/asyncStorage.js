import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error while saving data:', error);
  }
};

export const loadData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error while loading data:', error);
    return {};
  }
};

export const clearData= async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error while clearing data:', error);
  }
};
