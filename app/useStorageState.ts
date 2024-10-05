// useStorageState.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useStorageState<T>(key: string, defaultValue?: T): [T, (value: T) => void] {
  const [state, setState] = useState<T>(defaultValue as T);

  // Fetch the value from AsyncStorage on initial load
  useEffect(() => {
    const loadValue = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          setState(JSON.parse(storedValue));
        }
      } catch (error) {
        console.error(`Error loading ${key} from AsyncStorage:`, error);
      }
    };

    loadValue();
  }, [key]);

  // Save the value to AsyncStorage whenever it changes
  const setStoredState = (value: T) => {
    setState(value);
    AsyncStorage.setItem(key, JSON.stringify(value)).catch((error) => {
      console.error(`Error saving ${key} to AsyncStorage:`, error);
    });
  };

  return [state, setStoredState];
}

// (key: string, defaultValue?: T): [T, (value: T) => void] // old export function useStoregeState<T>