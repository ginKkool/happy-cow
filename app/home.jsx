import { SafeAreaView, View, StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";
import React, { useState } from "react";

import Header from "../components/Header";

import ListRestos from "../components/ListRestos";

export default function HomePage() {
  const [searchText, setSearchText] = useState("");
  return (
    <SafeAreaView style={styles.containerHome}>
      <Header search={searchText} setSearch={setSearchText} />
      <ListRestos search={searchText} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerHome: {
    backgroundColor: "#7c49c6",
    flex: 1,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    gap: 20,
  },
});
