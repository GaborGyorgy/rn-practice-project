import { config } from "dotenv";
import { ConfigContext, ExpoConfig } from "@expo/config";

const env = config({ path: "./.env.development" }).parsed;

const packageIdentifier = "com.react.native.practice";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "practice-project",
  slug: "practice-project",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: packageIdentifier,
    // googleServicesFile: "./GoogleService-Info.plist",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: packageIdentifier,

    // googleServicesFile: "./google-services.json",
  },
  web: {
    favicon: "./assets/images/favicon.png",
  },
  extra: {
    SPOONCULAR_API_KEY: env?.SPOONCULAR_API_KEY,
  },
});
