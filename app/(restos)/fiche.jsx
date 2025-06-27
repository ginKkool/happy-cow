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

import Constants from "expo-constants";
import Header from "../../components/Header";
import Filters from "../../components/Filters";
import { useLocalSearchParams } from "expo-router";
import data from "../../assets/restaurants.json";
import Map from "../../components/Map";

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

  return (
    <SafeAreaView style={styles.containerFiche}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {resto ? (
          <View style={styles.itemFiche}>
            <Text style={styles.name}>{resto.name}</Text>
            <View style={styles.containerInfos}>
              <Text style={styles.infos}>{resto.type}</Text>

              <Text style={styles.infos}>⭐ {resto.rating}</Text>
            </View>
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
            <Text style={styles.description}>{resto.description}</Text>
            <View style={styles.containerCoord}>
              <TouchableOpacity
                onPress={addFavorite}
                style={{
                  marginTop: 20,
                  backgroundColor: "#7c49c6",
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

              <Text style={styles.coord}>{resto.website}</Text>
              <Text style={styles.coord}>{resto.address}</Text>
              <Text style={styles.coord}>{resto.phone}</Text>
            </View>
          </View>
        ) : (
          <Text>Restaurant non trouvé</Text>
        )}
        <Map data={resto} />
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 8,
    backgroundColor: "white",
  },
  containerInfos: {
    flexDirection: "row",
    height: 30,
    backgroundColor: "#f5e5c9",
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
    fontSize: 16,
    paddingTop: 10,
  },

  containerCoord: {
    paddingTop: 20,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

// import {
//   View,
//   Text,
//   Image,
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   Platform,
// } from "react-native";
// import Constants from "expo-constants";
// import Header from "../../components/Header";
// import Filters from "../../components/Filters";
// import { useLocalSearchParams } from "expo-router";
// import data from "../../assets/restaurants.json";
// import Map from "../../components/Map";

// export default function FicheResto() {
//   const { placeId } = useLocalSearchParams();

//   const resto = data.find((item) => String(item.placeId) === placeId);

//   return (
//     <SafeAreaView style={styles.containerFiche}>
//       <ScrollView contentContainerStyle={{ padding: 16 }}>
//         {resto ? (
//           <View style={styles.itemFiche}>
//             <Text style={styles.name}>{resto.name}</Text>
//             <View style={styles.containerInfos}>
//               <Text style={styles.infos}>{resto.type}</Text>
//               <Text style={styles.infos}>{resto.category}</Text>
//               <Text style={styles.infos}>{resto.rating}</Text>
//               <Text style={styles.infos}>{resto.vegan}</Text>
//               <Text style={styles.infos}>{resto.vegOnly}</Text>
//             </View>
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               style={styles.carousel}
//             >
//               {resto.pictures.map((pictures, index) => (
//                 <Image
//                   key={index}
//                   source={{ uri: pictures }}
//                   style={styles.carouselImage}
//                   resizeMode="cover"
//                 />
//               ))}
//             </ScrollView>
//             <Text style={styles.description}>{resto.description}</Text>
//             <View style={styles.containerCoord}>
//               <Text style={styles.coord}>{resto.website}</Text>
//               <Text style={styles.coord}>{resto.address}</Text>
//               <Text style={styles.coord}>{resto.phone}</Text>
//             </View>
//           </View>
//         ) : (
//           <Text>Restaurant non trouvé</Text>
//         )}
//         <Map data={resto} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   containerFiche: {
//     backgroundColor: "#7c49c6",
//     flex: 1,
//     marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
//     gap: 20,
//   },

//   name: {
//     fontSize: 30,
//     fontWeight: "bold",
//     marginBottom: 8,
//     backgroundColor: "white",
//   },
//   containerInfos: {
//     flexDirection: "row",
//     height: 30,
//     backgroundColor: "#f5e5c9",
//     alignItems: "center",
//     justifyContent: "space-around",
//   },
//   infos: {
//     fontWeight: "bold",
//   },
//   carousel: {
//     marginVertical: 16,
//     height: 200,
//   },
//   carouselImage: {
//     width: 300,
//     height: 200,
//     borderRadius: 12,
//     marginRight: 10,
//   },

//   itemFiche: {
//     backgroundColor: "white",
//     padding: 20,
//   },

//   coord: {
//     fontSize: 16,
//     paddingTop: 10,
//   },

//   containerCoord: {
//     paddingTop: 20,
//   },
//   description: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 4,
//   },
// });
