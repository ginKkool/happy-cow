import {
  View,
  ScrollView,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { router } from "expo-router";
import React from "react";
import data from "../assets/restaurants.json";

const ListRestos = () => {
  const handlePress = (placeId) => {
    router.push({ pathname: "/fiche", params: { placeId: placeId } });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        resizeMode="contain"
        source={{ uri: item.pictures[0] }}
        style={styles.pictures}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text numberOfLines={5} style={styles.description}>
          {item.description}
        </Text>
        <Button
          style={styles.button}
          title="En savoir +"
          onPress={() => handlePress(item.placeId)}
          color="#7c49c6"
        />
      </View>
    </View>
  );

  return (
    <View style={styles.containerListRestos}>
      <FlatList
        data={data}
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
});

export default ListRestos;
