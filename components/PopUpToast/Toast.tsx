import React, { useEffect, useTransition } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

let toastInstance: any = null;

export const showToast = (message: string, type = "success") => {
  if (toastInstance) {
    toastInstance(message, type);
  }
};

// A separate ToastMessage component for each individual toast
const ToastMessage = ({
  id,
  message,
  type,
  onHide,
}: {
  id: number;
  message: string;
  type: string;
  onHide: (id: number) => void;
}) => {
  const translateY = useSharedValue(-200);
  const opacity = useSharedValue(1);
  const insets = useSafeAreaInsets();

  // Start the animation when the component mounts
  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 300 }),
      withTiming(1, { duration: 2000 }),
      withTiming(0, { duration: 300 })
    );
    translateY.value = withSequence(
      withSpring(
        -20 + (insets.top + 20),
        { damping: 10, stiffness: 100 },
        (finished) => {
          if (finished) runOnJS(onHide)(id); // Use runOnJS to call onHide
        }
      ),
      withTiming(-20 + insets.top, { duration: 2000 }),
      withSpring(-200, {})
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#5251F6";
      case "error":
        return "#F44336";
      default:
        return "#4CAF50";
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        { backgroundColor: getBackgroundColor() },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

// The main Toast component that manages all the toasts
const Toast = () => {
  const [toasts, setToasts] = React.useState([]);

  const [isTransitioning, startTransition] = useTransition();
  useEffect(() => {
    toastInstance = show;
    return () => {
      toastInstance = null;
    };
  }, []);
  const show = (msg: string, toastType: string) => {
    const id = Date.now();

    startTransition(() => {
      // @ts-ignore
      setToasts((prevToasts) => [
        ...prevToasts,
        { id, message: msg, type: toastType },
      ]);
    });
  };

  const hide = (id: number) => {
    startTransition(() => {
      setToasts((prevToasts: any) =>
        prevToasts.filter((toast: any) => toast.id !== id)
      );
    });
  };

  return (
    <View style={styles.wrapper}>
      {toasts.map((toast: any) => (
        <ToastMessage
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onHide={hide}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 20,
    zIndex: 999,
  },
  container: {
    marginVertical: 5,
    padding: 16,
    borderRadius: 8,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Toast;
