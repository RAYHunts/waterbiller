import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import useAuthStore from '@/store/authStore';
import { Appearance, useColorScheme } from 'react-native';

import * as Sentry from '@sentry/react-native';
import { useThemeStore } from '@/store/themeStore';

Sentry.init({
  dsn: 'https://79c82a2fa150d61678e68cf0cd0092f4@o4508782305607680.ingest.de.sentry.io/4508890551156816',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { updateSystemTheme, usedTheme } = useThemeStore();
  const [loaded] = useFonts({
    SpaceMono: require('~/assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { refreshSession } = useAuthStore();
  const refreshTheme = () => {
    Appearance.addChangeListener(() => {
      updateSystemTheme();
    });
  };

  useEffect(() => {
    refreshSession();
    refreshTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={usedTheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={usedTheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
};

export default Sentry.wrap(RootLayout);
