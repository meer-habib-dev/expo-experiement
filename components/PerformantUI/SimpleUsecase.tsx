import React, {
  Suspense,
  useLayoutEffect,
  useState,
  useTransition,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";

// Simulate heavy component loading with lazy
const HeavyDataComponent = React.lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            // @ts-ignore
            default: ({ data }: { data: string }) => (
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>Processed Data: {data}</Text>
              </View>
            ),
          }),
        2000
      )
    )
);

// Component demonstrating useLayoutEffect
const LayoutEffectDemo = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [elementRef, setElementRef] = useState<View | null>(null);

  useLayoutEffect(() => {
    if (elementRef) {
      // Measure and update dimensions before browser paint
      elementRef.measure(
        (x: number, y: number, width: number, height: number) => {
          setDimensions({ width, height });
        }
      );
    }
  }, [elementRef]);

  return (
    <View style={styles.layoutContainer}>
      <Text style={styles.title}>useLayoutEffect Demo</Text>
      <View ref={setElementRef} style={styles.measuredElement}>
        <Text>Measured Element</Text>
      </View>
      <Text>
        Dimensions: {dimensions.width.toFixed(0)} x{" "}
        {dimensions.height.toFixed(0)}
      </Text>
    </View>
  );
};

const SimpleUsecase = () => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState("Initial");
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);

  const handleHeavyOperation = () => {
    // Use transition for non-urgent state updates
    startTransition(() => {
      // Simulate heavy data processing
      const result = Array(10000)
        .fill(0)
        .reduce((acc) => acc + Math.random(), 0)
        .toFixed(2);

      setData(result);
      setShowHeavyComponent(true);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Advanced React Hooks Demo</Text>

      {/* useLayoutEffect Demo */}
      <LayoutEffectDemo />

      {/* useTransition & Suspense Demo */}
      <View style={styles.transitionContainer}>
        <Text style={styles.title}>useTransition & Suspense Demo</Text>
        <Pressable
          style={[styles.button, isPending && styles.buttonDisabled]}
          onPress={handleHeavyOperation}
        >
          <Text style={styles.buttonText}>
            {isPending ? "Processing..." : "Start Heavy Operation"}
          </Text>
        </Pressable>

        {showHeavyComponent && (
          <Suspense
            fallback={
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading Heavy Component...</Text>
              </View>
            }
          >
            <HeavyDataComponent data={data} />
          </Suspense>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  layoutContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  measuredElement: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
  },
  transitionContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#999",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loading: {
    padding: 20,
    alignItems: "center",
  },
  dataContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#e8f4ff",
    borderRadius: 4,
  },
  dataText: {
    fontSize: 16,
  },
});

export default SimpleUsecase;
