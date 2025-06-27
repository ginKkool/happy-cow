import { View, SafeAreaView, StyleSheet, Platform } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LogoHead from "../../components/LogoHead";

import Title from "../../components/Title";
import Input from "../../components/Input";
import SignButton from "../../components/SignButton";
import RedirectButton from "../../components/RedirectionButton";

export default function Login() {
  return (
    <SafeAreaView style={styles.containerLogin}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <LogoHead />
          <Title content="Account" />
        </View>
        <View>
          <Input style={styles.input} placeholder="email" />
          <Input placeholder="Password" secure={true} />
        </View>
        <View>
          <SignButton text="Sign in" onPressFunc={() => {}} />
          <RedirectButton text={"No account ? Register !"} screen={"/signup"} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerLogin: {
    backgroundColor: "#7c49c6",
    flex: 1,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    gap: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-around",
  },

  titleContainer: {
    alignItems: "center",
    gap: 25,
  },
});
