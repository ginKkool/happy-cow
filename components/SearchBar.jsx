import { TextInput, StyleSheet } from "react-native";

const SearchBar = ({ placeholder, state, setState, secure }) => {
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
    height: 30,
    width: 380,
    backgroundColor: "white",
  },
});

export default SearchBar;
