import { TouchableOpacity, Text, StyleSheet } from "react-native";

const SignButton = ({ text, onPressFunc }) => {
  return (
    <TouchableOpacity style={styles.SignButton} onPress={onPressFunc}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  SignButton: {
    height: 60,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f5e5c9",
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f5e5c9",
  },
});

export default SignButton;
