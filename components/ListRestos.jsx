import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import data from "../assets/restaurants.json";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import LogoHead from "../components/LogoHead";

const FAVORITES_KEY = "@favorites_restos";

const ListRestos = ({ search }) => {
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      Array.isArray(item.pictures) &&
      item.description &&
      item.description.trim() !== ""
  );

  const handlePress = (placeId) => {
    router.push({ pathname: "/fiche", params: { placeId: placeId } });
  };

  const addFavorite = async (item) => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
      const currentFavs = jsonValue ? JSON.parse(jsonValue) : [];

      // Vérifie si déjà dans favoris
      if (currentFavs.some((fav) => fav.placeId === item.placeId)) {
        alert("Ce restaurant est déjà dans vos favoris.");
        return;
      }

      const updatedFavs = [...currentFavs, item];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavs));
      alert("Restaurant ajouté aux favoris !");
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handlePress(item.placeId)}
      activeOpacity={0.8}
    >
      {item.pictures && item.pictures.length > 0 && item.pictures[0] ? (
        <Image
          resizeMode="contain"
          source={{ uri: item.pictures[0] }}
          style={styles.pictures}
        />
      ) : (
        <View style={styles.logoContainer}>
          <LogoHead />
        </View>
      )}

      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.starsContainer}>{renderStars(item.rating)}</View>

        <Text numberOfLines={5} style={styles.description}>
          {item.description}
        </Text>
        <TouchableOpacity
          onPress={() => addFavorite(item)}
          style={{
            marginTop: 10,
            padding: 8,
            backgroundColor: "#e888ef",
            borderRadius: 50,
            alignSelf: "flex-start",
          }}
        >
          <Ionicons name="heart-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.containerListRestos}>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.placeId}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerListRestos: {
    flex: 1,
    paddingTop: 10,
  },
  item: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  pictures: {
    width: 150,
    height: 150,
    marginTop: 15,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  logoContainer: {
    width: 150,
    height: 150,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee", // optionnel
  },
  starsContainer: {
    flexDirection: "row",
    marginTop: 4,
    alignItems: "center",
  },
});

export default ListRestos;

{
  /* <Image
        resizeMode="contain"
        source={{ uri: item.pictures[0] }}
        style={styles.pictures}
      /> */
}
