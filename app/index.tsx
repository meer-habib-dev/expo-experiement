// import BoxShadowFilter from "@/components/BoxShadowFilter";
// import DummyTest from "@/components/DummyTest";
import PerformantUI from "@/components/PerformantUI";
import PopUpToast from "@/components/PopUpToast";
import { SafeAreaView, StyleSheet } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <BoxShadowFilter /> */}
      {/* <DummyTest /> */}
      {/* <PerformantUI /> */}
      <PopUpToast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
