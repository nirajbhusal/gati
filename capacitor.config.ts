import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.gati.patro",
  appName: "Gati",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      backgroundColor: "#07070c",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#07070c",
    },
  },
};

export default config;
