import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SUITBold: require("@/assets/fonts/SUIT-Bold.ttf"),
    SUITExtraBold: require("@/assets/fonts/SUIT-ExtraBold.ttf"),
    SUITExtraLight: require("@/assets/fonts/SUIT-ExtraLight.ttf"),
    SUITHeavy: require("@/assets/fonts/SUIT-Heavy.ttf"),
    SUITLight: require("@/assets/fonts/SUIT-Light.ttf"),
    SUITMedium: require("@/assets/fonts/SUIT-Medium.ttf"),
    SUITRegular: require("@/assets/fonts/SUIT-Regular.ttf"),
    SUITSemiBold: require("@/assets/fonts/SUIT-SemiBold.ttf"),
    SUITThin: require("@/assets/fonts/SUIT-Thin.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="quiz/index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
