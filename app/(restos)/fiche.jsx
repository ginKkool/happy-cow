import { View, StyleSheet, ScrollView } from "react-native";
import Header from ".../components/Header";
import Filters from ".../components/Filters";

export default function FicheResto() {
  return (
    <SafeAreaView>
      <Header />
      <Filters />
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {},
});
