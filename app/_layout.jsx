import { SplashScreen, Stack } from 'expo-router';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
//Splash screens are usually shown when an app is launched and may automatically hide after a certain period of time.
SplashScreen.preventAutoHideAsync() //prevent splash screen from hiding automatically, giving control when it should be hidden.

export default function RootLayout() {

  const [Fontsloaded,error] = useFonts({
    "poppins-black" : require("../assets/fonts/Poppins-Black.ttf"),
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
    if(error) throw error;

    if(Fontsloaded) SplashScreen.hideAsync();

    if(!Fontsloaded && !error) return null;

  },[Fontsloaded,error])

  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown : false}} />
    </Stack>
  );
}
