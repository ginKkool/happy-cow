import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const HomeLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#7c49c6",
        tabBarStyle: {
          height: 80, // 👈 agrandit la hauteur
          paddingBottom: 15, // 👈 espace autour de l'icône
          paddingTop: 10,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" color={color} size={size} />
        ),
        tabBarLabelStyle: {
          fontSize: 16, // 👈 taille du texte
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="(restos)"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="(auth)"
        options={{
          title: "account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favoris"
        options={{
          title: "Favoris",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default HomeLayout;
