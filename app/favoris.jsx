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

import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaView } from "react-native-safe-area-context";

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

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() =>
          router.push({ pathname: "/fiche", params: { placeId: item.placeId } })
        }
      >
        <Image source={{ uri: item.pictures[0] }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.infos}>⭐ {item.rating}</Text>
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
    paddingTop: 70,
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
    backgroundColor: "#ff4d4d",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});
