import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import customTheme from "./src/theme/customTheme";
import BottomBar from "./src/navigation/BottomBar";
import { QueryClient, QueryClientProvider } from "react-query";

const fonts = {
  "Poppins-SemiBold": require("./src/assets/fonts/Poppins-SemiBold.ttf"),
};

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const queryClient = new QueryClient();

  useEffect(() => {
    async function prepare(): Promise<void> {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(fonts);
      } catch (e) {
        console.warn(e);
      } finally {
        setTimeout(() => {
          setAppIsReady(true);
        }, 800);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer
        fallback={<Text>Chargement...</Text>}
        theme={customTheme}
      >
        <View style={styles.container} onLayout={onLayoutRootView}>
          <StatusBar style="auto" />
          <BottomBar />
        </View>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
