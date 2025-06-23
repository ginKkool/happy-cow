import { View, StyleSheet } from "react-native";
import { Redirect } from "expo-router";

export default function index() {
  return <Redirect href={"/home"} />;
}

const styles = StyleSheet.create({
  view: {},
});
