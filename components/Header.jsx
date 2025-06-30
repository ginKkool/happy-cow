import { View, StyleSheet } from "react-native";
import LogoHead from "./LogoHead";
import SearchBar from "./SearchBar";

export default function Header({ search, setSearch }) {
  return (
    <View style={[styles.containerHeader]}>
      <LogoHead />
      <SearchBar placeholder="Search..." state={search} setState={setSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: "#7c49c6",
    alignItems: "center",
    height: 120,
    justifyContent: "space-between",
  },
});

// import { View, Text, StyleSheet } from "react-native";
// import LogoHead from "./LogoHead";
// import SearchBar from "./SearchBar";

// export default function Header() {
//   return (
//     <View style={[styles.containerHeader]}>
//       <LogoHead />
//       <SearchBar></SearchBar>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   containerHeader: {
//     backgroundColor: "#7c49c6",
//     alignItems: "center",
//     height: 130,
//     justifyContent: "space-between",
//   },
// });
