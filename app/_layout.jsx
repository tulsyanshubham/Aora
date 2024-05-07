import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar'

import GlobalProvider from '../context/GlobalProvider';

//Splash screens are usually shown when an app is launched and may automatically hide after a certain period of time.
SplashScreen.preventAutoHideAsync() //prevent splash screen from hiding automatically, giving control when it should be hidden.

const RootLayout = () => {

  const [Fontsloaded, error] = useFonts({
    "poppins-black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf")
  })

  useEffect(() => {
    if (error) throw error;

    if (Fontsloaded) {
      SplashScreen.hideAsync();
    }
  }, [Fontsloaded, error]);

  if (!Fontsloaded) {
    return null;
  }

  if (!Fontsloaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='search/[query]' options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor='#161622' style='light' />
    </GlobalProvider>
  );
}

export default RootLayout;