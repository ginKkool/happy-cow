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
    height: 35,
    width: 350,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default SearchBar;
