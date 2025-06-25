import { TextInput, StyleSheet } from "react-native";

const Input = ({ placeholder, state, setState, secure }) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      value={state}
      onChangeText={setState}
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
    borderBottomColor: "#d6393f",
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default Input;
