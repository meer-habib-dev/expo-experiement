import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Animated,
  Platform,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";

const ShadowFilterShowcase = () => {
  // Animation for interactive card
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderShadowExample = (
    title: string,
    description: string,
    shadowStyle: StyleSheet.NamedStyles<any>
  ) => (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>{title}</Text>
      <Text style={styles.exampleDescription}>{description}</Text>
      <View style={[styles.shadowDemo, shadowStyle]}>
        <Text style={styles.codeText}>
          {JSON.stringify(shadowStyle, null, 2)}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Shadow & Filter Examples</Text>
      <Text style={styles.subtitle}>React Native 0.76 • Expo SDK 52</Text>

      {/* Basic Shadows Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Shadows</Text>

        {renderShadowExample(
          "Soft Shadow",
          "Subtle elevation for cards",
          styles.softShadow
        )}

        {renderShadowExample(
          "Medium Shadow",
          "Standard component elevation",
          styles.mediumShadow
        )}

        {renderShadowExample(
          "Strong Shadow",
          "High elevation for modals",
          styles.strongShadow
        )}
      </View>

      {/* Colored Shadows Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Colored Shadows</Text>

        <View style={styles.exampleContainer}>
          <Text style={styles.exampleTitle}>Colored Shadow</Text>
          <Text style={styles.exampleDescription}>Custom shadow colors</Text>
          <View style={styles.coloredShadowsRow}>
            <View style={[styles.coloredShadowDemo, styles.blueShadow]}>
              <Text style={styles.shadowLabel}>Blue</Text>
            </View>
            <View style={[styles.coloredShadowDemo, styles.purpleShadow]}>
              <Text style={styles.shadowLabel}>Purple</Text>
            </View>
            <View style={[styles.coloredShadowDemo, styles.greenShadow]}>
              <Text style={styles.shadowLabel}>Green</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Blur Effects Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Blur Effects</Text>

        <View style={styles.exampleContainer}>
          <Text style={styles.exampleTitle}>Glass Effect</Text>
          <Text style={styles.exampleDescription}>Using Expo BlurView</Text>
          <View style={styles.blurContainer}>
            <BlurView intensity={20} style={styles.blurView}>
              <Text style={styles.blurText}>Frosted Glass</Text>
            </BlurView>
          </View>
        </View>
      </View>

      {/* Interactive Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Example</Text>

        <TouchableOpacity
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          activeOpacity={1}
        >
          <Animated.View
            style={[
              styles.interactiveCard,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Text style={styles.interactiveTitle}>Press Me!</Text>
            <Text style={styles.interactiveDescription}>
              Animated shadow and scale effect
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 16,
  },
  exampleContainer: {
    marginBottom: 24,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2D3748",
    marginBottom: 4,
  },
  exampleDescription: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 12,
  },
  shadowDemo: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "white",
    minHeight: 100,
  },
  softShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  mediumShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  strongShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  coloredShadowsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coloredShadowDemo: {
    width: "30%",
    height: 100,
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  blueShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#4299E1",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  purpleShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#9F7AEA",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  greenShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#48BB78",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  shadowLabel: {
    fontSize: 14,
    color: "#4A5568",
  },
  blurContainer: {
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#E2E8F0",
  },
  blurView: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  blurText: {
    fontSize: 18,
    color: "#2D3748",
    fontWeight: "500",
  },
  interactiveCard: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.2,
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  interactiveTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 8,
  },
  interactiveDescription: {
    fontSize: 16,
    color: "#718096",
  },
  codeText: {
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
    }),
    fontSize: 12,
    color: "#4A5568",
  },
});

export default ShadowFilterShowcase;
