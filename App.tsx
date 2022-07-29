import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { AccountProvider } from "./context";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <RootSiblingParent>
          <AccountProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </AccountProvider>
        </RootSiblingParent>
      </SafeAreaProvider>
    );
  }
}
