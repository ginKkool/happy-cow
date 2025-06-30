import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaView } from "react-native-safe-area-context";
import LogoHead from "../components/LogoHead";

const FAVORITES_KEY = "@favorites_restos";

export default function FavoritesPage({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
      setFavorites(jsonValue ? JSON.parse(jsonValue) : []);
    } catch (error) {
      console.error("Erreur chargement favoris", error);
    }
  };

  const removeFavorite = async (placeId) => {
    Alert.alert(
      "Supprimer ce favori ?",
      "",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: async () => {
            try {
              const updatedFavs = favorites.filter(
                (item) => item.placeId !== placeId
              );
              setFavorites(updatedFavs);
              await AsyncStorage.setItem(
                FAVORITES_KEY,
                JSON.stringify(updatedFavs)
              );
            } catch (error) {
              console.error("Erreur suppression favori", error);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < roundedRating ? "star" : "star-outline"}
          size={14}
          color="#f1c40f"
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() =>
          router.push({ pathname: "/fiche", params: { placeId: item.placeId } })
        }
      >
        {item.pictures && item.pictures[0] ? (
          <Image source={{ uri: item.pictures[0] }} style={styles.image} />
        ) : (
          <View style={styles.logoContainer}>
            <LogoHead />
          </View>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.starsContainer}>{renderStars(item.rating)}</View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => removeFavorite(item.placeId)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );

  if (favorites.length === 0) {
    return (
      <SafeAreaView>
        <View style={styles.emptyContainer}>
          <Text>Aucun favori pour l'instant.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <FlatList
      style={styles.containerFavoris}
      data={favorites}
      keyExtractor={(item) => item.placeId}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  containerFavoris: {
    backgroundColor: "#7c49c6",
    flex: 1,

    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    gap: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  itemContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  type: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },

  deleteButton: {
    backgroundColor: "#e888ef",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
});
