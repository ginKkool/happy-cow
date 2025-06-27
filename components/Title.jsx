import { Text, StyleSheet } from "react-native";

const Title = ({ content }) => {
  return <Text style={styles.title}>{content}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#f5e5c9",
  },
});

export default Title;
