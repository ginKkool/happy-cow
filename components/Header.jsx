import { View, Text, StyleSheet } from "react-native";
import LogoHead from "./components/Logo-head";

export default function HomePage() {
  return (
    <View style={[styles.containerHeader]}>
      <LogoHead />
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: "#7c49c6",
    height: 150,
  },
});
