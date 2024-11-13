import BoxShadowFilter from "@/components/BoxShadowFilter";
import { SafeAreaView, StyleSheet } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <BoxShadowFilter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
