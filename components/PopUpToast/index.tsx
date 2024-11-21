import React from "react";
import Toast, { showToast } from "./Toast";
import { Pressable, StyleSheet, Text, View } from "react-native";

const PopUpToast = () => {
  const onPressToast = (message: string, type: "success" | "error") => {
    showToast(message, type);
  };
  return (
    <>
      {/* Call the toast component at the root of your project if using expo (_layout.tsx) in app folder */}
      <Toast />

      <View style={styles.container}>
        <Pressable
          style={styles.successButton}
          onPress={() =>
            onPressToast("✅ Success! completed successfully. 🎉", "success")
          }
        >
          <Text style={styles.buttonText}>Show Success Toast</Text>
        </Pressable>
        <Pressable
          style={styles.errorButton}
          onPress={() =>
            onPressToast("⚠️ Error! Something went wrong. 🚨", "error")
          }
        >
          <Text style={styles.buttonText}>Show Error Toast</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  successButton: {
    backgroundColor: "#5251F6",
    paddingVertical: 12,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 16,
  },
  errorButton: {
    backgroundColor: "#F44336",
    paddingVertical: 12,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PopUpToast;
