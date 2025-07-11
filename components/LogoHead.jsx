import { View, Text, StyleSheet, Image } from "react-native";

export default function LogoHead() {
  return (
    <View>
      <Image
        source={require("../assets/imgs/Logo_Head.png")}
        style={styles.logoHead}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoHead: {
    height: 80,
    width: 80,
  },
});
