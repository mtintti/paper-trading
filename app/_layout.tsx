import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';
import { theme } from '@/theme';
import { useColorScheme } from '@/components/useColorScheme';

import { SearchProvider } from './context/searchContext';
import { AuthProvider, useAuth } from './authContext';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const {session} = useAuth();
  console.log("Session state:", session);

  return (
    <AuthProvider>
      <SearchProvider>
        <PaperProvider theme={theme}>
          <ThemeProvider value={DarkTheme}>
            <Stack>
              {session == null ?(
                <Stack.Screen name="index" options={{ headerShown: false }} />
              ) : (
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              )}
            </Stack>
          </ThemeProvider>
        </PaperProvider>
      </SearchProvider>
      </AuthProvider>
  );
}
