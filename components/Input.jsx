import { TextInput, StyleSheet } from "react-native";

const Input = ({ placeholder, secure }) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      placeholderTextColor={"#c9b99f"}
      value={""}
      autoCapitalize="none"
      secureTextEntry={secure}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: 300,
    margin: 12,
    borderBottomColor: "#f5e5c9",
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default Input;
