import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import Header from "../../components/Header";
import Filters from "../../components/Filters";
import { useLocalSearchParams } from "expo-router";
import data from "../../assets/restaurants.json";

export default function FicheResto() {
  const { placeId } = useLocalSearchParams();

  const resto = data.find((item) => String(item.placeId) === placeId);

  return (
    <SafeAreaView style={styles.containerFiche}>
      <Header />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {resto ? (
          <View style={styles.itemFiche}>
            <Text style={styles.name}>{resto.name}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.carousel}
            >
              {resto.pictures.map((pictures, index) => (
                <Image
                  key={index}
                  source={{ uri: pictures }}
                  style={styles.carouselImage}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>

            <Text style={styles.info}>{resto.address}</Text>
            <Text style={styles.info}>{resto.phone}</Text>
            <Text style={styles.info}>{resto.rating}</Text>

            <Text style={styles.description}>{resto.description}</Text>
            <Text style={styles.info}>{resto.website}</Text>
          </View>
        ) : (
          <Text>Restaurant non trouvé</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerFiche: {
    backgroundColor: "#7c49c6",
    flex: 1,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    gap: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    backgroundColor: "white",
  },

  carousel: {
    marginVertical: 16,
    height: 200,
  },
  carouselImage: {
    width: 300,
    height: 200,
    borderRadius: 12,
    marginRight: 10,
  },

  itemFiche: {
    backgroundColor: "white",
    padding: 20,
  },

  info: {
    fontSize: 16,
    marginBottom: 4,
    paddingTop: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
