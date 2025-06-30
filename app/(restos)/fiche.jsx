import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Pour l'icône cœur
import { Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import { Linking } from "react-native";

import { useLocalSearchParams } from "expo-router";
import data from "../../assets/restaurants.json";
import Map from "../../components/Map";
import LogoHead from "../../components/LogoHead";

const FAVORITES_KEY = "@favorites_restos";

export default function FicheResto() {
  const { placeId } = useLocalSearchParams();

  const resto = data.find((item) => String(item.placeId) === placeId);

  const addFavorite = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
      const currentFavs = jsonValue ? JSON.parse(jsonValue) : [];

      // Si déjà en favori
      if (currentFavs.some((fav) => fav.placeId === resto.placeId)) {
        Alert.alert("Ce restaurant est déjà dans vos favoris.");
        return;
      }

      const updatedFavs = [...currentFavs, resto];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavs));
      Alert.alert("Ajouté aux favoris !");
    } catch (error) {
      console.error("Erreur ajout favori", error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < roundedRating ? "star" : "star-outline"}
          size={16}
          color="#f1c40f"
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  return (
    <SafeAreaView style={styles.containerFiche}>
      <KeyboardAwareScrollView contentContainerStyle={{ padding: 16 }}>
        {resto ? (
          <View style={styles.itemFiche}>
            <Text style={styles.name}>{resto.name}</Text>
            <View style={styles.containerInfos}>
              <Text style={styles.infos}>{resto.type}</Text>

              <View style={styles.starsContainer}>
                {renderStars(resto.rating)}
              </View>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.carousel}
            >
              {resto.pictures && resto.pictures.length > 0 ? (
                resto.pictures.map((picture, index) =>
                  picture && picture.trim() !== "" ? (
                    <Image
                      key={index}
                      source={{ uri: picture }}
                      style={styles.carouselImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View key={index} style={styles.logoContainer}>
                      <LogoHead />
                    </View>
                  )
                )
              ) : (
                <View style={styles.logoContainer}>
                  <LogoHead />
                </View>
              )}
            </ScrollView>

            <Text style={styles.description}>{resto.description}</Text>
            <View style={styles.containerCoord}>
              <TouchableOpacity
                onPress={addFavorite}
                style={{
                  marginTop: 20,
                  backgroundColor: "#e888ef",
                  alignSelf: "flex-start",
                  padding: 10,
                  borderRadius: 8,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="heart-outline"
                  size={20}
                  color="white"
                  style={{ marginRight: 8 }}
                />
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Ajouter aux favoris
                </Text>
              </TouchableOpacity>

              <Text
                style={[styles.coord, styles.link]}
                onPress={() => Linking.openURL(resto.website)}
              >
                {resto.website}
              </Text>

              <Text style={styles.coord}>{resto.address}</Text>
              <Text style={styles.coord}>{resto.phone}</Text>
            </View>
          </View>
        ) : (
          <Text>Restaurant non trouvé</Text>
        )}
        <Map data={resto} />
      </KeyboardAwareScrollView>
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 8,
    backgroundColor: "white",
  },
  containerInfos: {
    flexDirection: "row",
    height: 30,
    backgroundColor: "#f4f0e8",
    alignItems: "center",
    justifyContent: "space-around",
  },
  infos: {
    fontWeight: "bold",
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

  coord: {
    paddingTop: 5,
    fontSize: 12,
  },

  link: {
    color: "#7c49c6",
    textDecorationLine: "underline",
  },

  containerCoord: {
    paddingTop: 10,
  },

  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  logoContainer: {
    width: 300,
    height: 200,
    borderRadius: 12,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
