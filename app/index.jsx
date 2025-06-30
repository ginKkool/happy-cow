import { View, StyleSheet, Text, Platform, Image } from "react-native";
import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import LogoHead from "../components/LogoHead";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // 3 secondes

    return () => clearTimeout(timer);
  }, []);

  if (!showSplash) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/imgs/Logo_Head.png")}
        style={styles.logoHead}
        resizeMode="contain"
      />
      <Image
        source={require("../assets/imgs/hc-logo-white.png")}
        style={styles.logoHead}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7c49c6",
    flex: 1,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,

    alignItems: "center",
    justifyContent: "center",
  },
  logoHead: {
    height: 300,
    width: 300,
  },
});

// export default function index() {
//   return <Redirect href="/home" />;
// }
