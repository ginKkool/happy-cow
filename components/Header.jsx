import { View, Text, StyleSheet } from "react-native";
import LogoHead from "./Logo-head";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <View style={[styles.containerHeader]}>
      <LogoHead />
      <SearchBar></SearchBar>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: "#7c49c6",
    alignItems: "center",
    height: 150,
    gap: 20,
  },
});
