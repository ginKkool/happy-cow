import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  Flatlist,
} from "react-native";

import Header from "../components/Header";
import Filters from "../components/Filters";
import ListRestos from "../components/ListRestos";
import Login from "./(auth)/login";

export default function HomePage() {
  return (
    <SafeAreaView style={styles.containerHome}>
      <Header />

      <ListRestos />
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
