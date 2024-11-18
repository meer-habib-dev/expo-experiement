// import BoxShadowFilter from "@/components/BoxShadowFilter";
// import DummyTest from "@/components/DummyTest";
import PerformantUI from "@/components/PerformantUI";
import { SafeAreaView, StyleSheet } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <BoxShadowFilter /> */}
      {/* <DummyTest /> */}
      <PerformantUI />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
