import { SafeAreaView, ScrollView } from "react-native";
import Header from "../components/Header";
import Filters from "../components/Filters";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  return (
    <SafeAreaView style={styles.containerHome}>
      <Header />
      <Filters />
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
});
