import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const RedirectButton = ({ text, screen }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.replace(screen);
      }}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#f5e5c9",
    textAlign: "center",
    paddingTop: 15,
  },
});

export default RedirectButton;
