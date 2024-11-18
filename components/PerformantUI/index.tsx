// PerformantUI.js
import React, { Suspense, useState, useTransition } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";

// Lazy load components for better initial load performance
const SimpleUsecase = React.lazy(
  () =>
    // Simulate network delay for demo purposes
    new Promise((resolve) =>
      // @ts-ignore
      setTimeout(() => resolve(import("./SimpleUsecase")), 800)
    )
);

const AdvanceUsecase = React.lazy(
  () =>
    new Promise((resolve) =>
      // @ts-ignore
      setTimeout(() => resolve(import("./AdvanceUsecase")), 1000)
    )
);

// Loading fallback component with animation
const LoadingFallback = () => {
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.loadingContainer, { opacity: fadeAnim }]}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.loadingText}>Loading content...</Text>
    </Animated.View>
  );
};

const TabButton = ({
  isActive,
  onPress,
  label,
  isPending,
}: {
  isActive: boolean;
  onPress: () => void;
  label: string;
  isPending: boolean;
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.tab,
      isActive && styles.activeTab,
      pressed && styles.pressedTab,
    ]}
  >
    <Text
      style={[
        styles.tabText,
        isActive && styles.activeTabText,
        isPending && styles.pendingTabText,
      ]}
    >
      {label}
    </Text>
    {isPending && (
      <ActivityIndicator
        size="small"
        color="#007AFF"
        style={styles.tabLoader}
      />
    )}
  </Pressable>
);

const PerformantUI = () => {
  const [activeTab, setActiveTab] = useState("simple");
  const [isPending, startTransition] = useTransition();
  const [slideAnim] = useState(new Animated.Value(0));

  const handleTabPress = (tab: string) => {
    // Animate slide direction based on tab change
    const toValue = tab === "simple" ? 0 : 1;

    // Use transition to keep UI responsive during tab switch
    startTransition(() => {
      Animated.timing(slideAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setActiveTab(tab);
    });
  };

  // Calculate transform for slide animation
  const translateX = slideAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -10, 0], // Subtle slide effect
  });

  const opacity = slideAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.8, 1],
  });

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TabButton
          isActive={activeTab === "simple"}
          onPress={() => handleTabPress("simple")}
          label="Simple Examples"
          isPending={isPending && activeTab === "advanced"}
        />
        <TabButton
          isActive={activeTab === "advanced"}
          onPress={() => handleTabPress("advanced")}
          label="Advanced Examples"
          isPending={isPending && activeTab === "simple"}
        />
      </View>

      {/* Loading Indicator for Tab Transition */}
      {isPending && (
        <View style={styles.transitionIndicator}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.transitionText}>Switching content...</Text>
        </View>
      )}

      {/* Content Area */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            transform: [{ translateX }],
            opacity,
          },
        ]}
      >
        <Suspense fallback={<LoadingFallback />}>
          {activeTab === "simple" ? <SimpleUsecase /> : <AdvanceUsecase />}
        </Suspense>
      </Animated.View>

      {/* Error Boundary Feedback */}
      <View style={styles.errorContainer}>
        {isPending && (
          <Text style={styles.errorText}>
            If content doesn't load, tap the tab again
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#007AFF",
  },
  pressedTab: {
    opacity: 0.7,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  pendingTabText: {
    color: "#999",
  },
  tabLoader: {
    marginLeft: 8,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  transitionIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#f8f8f8",
  },
  transitionText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  errorContainer: {
    padding: 8,
    alignItems: "center",
  },
  errorText: {
    fontSize: 12,
    color: "#999",
  },
});

export default PerformantUI;
