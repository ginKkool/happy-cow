import { Tabs } from "expo-router";

const HomeLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
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
      <Tabs.Screen name="(auth)" options={{ title: "Login" }} />
    </Tabs>
  );
};

export default HomeLayout;
