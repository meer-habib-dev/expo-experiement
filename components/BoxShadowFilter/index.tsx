import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Animated,
  Pressable,
  Image,
  StyleSheet,
  ViewStyle,
} from "react-native";

// Types
interface ShadowCardProps {
  title: string;
  description: string;
  style: ViewStyle;
}

interface ColorCardProps {
  color: string;
  label: string;
  shadowColor: string;
}

interface FilterCardProps {
  filter?: string;
  label: string;
}

interface AnimatedPressableProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

// Reusable Animated Pressable Component
const AnimatedPressable: React.FC<AnimatedPressableProps> = ({
  children,
  style,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = (): void => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (): void => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[style, { transform: [{ scale: scaleAnim }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

// Shadow Card Component
const ShadowCard: React.FC<ShadowCardProps> = ({
  title,
  description,
  style,
}) => (
  <AnimatedPressable style={[styles.card, style] as Object}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </AnimatedPressable>
);

// Color Card Component
const ColorCard: React.FC<ColorCardProps> = ({ color, label, shadowColor }) => (
  <AnimatedPressable
    style={
      [
        styles.colorCard,
        {
          boxShadow: `0px 4px 12px 0px ${shadowColor}`,
          backgroundColor: color,
        },
      ] as Object
    }
  >
    <Text style={styles.colorLabel}>{label}</Text>
  </AnimatedPressable>
);

// Filter Card Component
const FilterCard: React.FC<FilterCardProps> = ({ filter, label }) => (
  <AnimatedPressable
    style={[styles.filterCard, filter && { filter }] as Object}
  >
    <Image
      source={require("../../assets/images/react-logo.png")}
      style={{ width: 100, height: 100 }}
    />
    <Text style={styles.filterLabel}>{label}</Text>
  </AnimatedPressable>
);

// Main Component
const BoxShadowFilter: React.FC = () => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.header}>Modern Box Shadow & Filter Examples</Text>
        <Text style={styles.subheader}>React Native 0.76 & Expo 52</Text>

        {/* Box Shadow Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Box Shadows</Text>
          <ShadowCard
            title="Soft Shadow (String Syntax)"
            description="Using boxShadow string syntax"
            style={{
              boxShadow: "0px 2px 8px 0px rgba(60, 179, 113, 0.6)",
              backgroundColor: "white",
            }}
          />
          <ShadowCard
            title="Medium Shadow (Object Syntax)"
            description="Using boxShadow object syntax"
            style={{
              boxShadow: "12px 12px 2px 1px rgba(0, 0, 255, .3)",
              backgroundColor: "white",
            }}
          />
          <View style={{ height: 10 }} />
          <ShadowCard
            title="Inset Shadow"
            description="Inner shadow effect"
            style={{
              boxShadow: "inset 0px 2px 8px 0px rgba(106, 90, 205, 0.6)",
              backgroundColor: "white",
            }}
          />
        </View>

        {/* Colored Shadows */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Colored Shadows</Text>
          <View style={styles.coloredCardRow}>
            <ColorCard
              color="white"
              label="Blue"
              shadowColor="rgba(66, 153, 225, 0.3)"
            />
            <ColorCard
              color="white"
              label="Purple"
              shadowColor="rgba(159, 122, 234, 0.3)"
            />
            <ColorCard
              color="white"
              label="Orange"
              shadowColor="rgba(237, 137, 54, 0.3)"
            />
          </View>
        </View>

        {/* Filter Effects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filter Effects</Text>
          <View style={styles.filterRow}>
            <FilterCard label="No Filter" />
            <FilterCard label="Opacity" filter="opacity(0.5)" />
            <FilterCard label="Brightness" filter="brightness(1.5)" />
          </View>
        </View>

        {/* Interactive Shadow */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interactive Shadow</Text>
          <AnimatedPressable
            style={
              [
                styles.interactiveCard,
                {
                  boxShadow: "12px 12px 2px 1px rgba(0, 0, 0, 1)",
                  backgroundColor: "#5251F6",
                },
              ] as Object
            }
          >
            <Text style={styles.interactiveTitle}>Press Me!</Text>
            <Text style={styles.interactiveDescription}>
              Shadow responds to touch
            </Text>
          </AnimatedPressable>
        </View>
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F7FA",
  },
  content: {
    // flexGrow: 1,
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  subheader: {
    fontSize: 16,
    color: "#666666",
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
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2D3748",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#718096",
  },
  coloredCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  colorCard: {
    width: 105,
    height: 100,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  colorLabel: {
    fontSize: 14,
    color: "#4A5568",
    fontWeight: "500",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  filterCard: {
    alignItems: "center",
  },
  filterLabel: {
    fontSize: 12,
    color: "#4A5568",
    marginTop: 8,
  },
  interactiveCard: {
    padding: 24,
    borderRadius: 10,
  },
  interactiveTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  interactiveDescription: {
    fontSize: 16,
    color: "#f6f6f6",
  },
});

export default BoxShadowFilter;
