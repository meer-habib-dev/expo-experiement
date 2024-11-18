import React, {
  Suspense,
  useLayoutEffect,
  useState,
  useTransition,
  useRef,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Animated,
  ScrollView,
} from "react-native";

// Simulate API calls with delay
const fetchUserProfile = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          name: "John Doe",
          email: "john@example.com",
          stats: {
            posts: 142,
            followers: 1234,
            following: 890,
          },
        }),
      1500
    )
  );

// Simulate API calls with delay
const fetchUserPosts = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          Array(20)
            .fill(0)
            .map((_, i) => ({
              id: i,
              title: `Post ${i + 1}`,
              content: `Content for post ${i + 1}`,
              likes: Math.floor(Math.random() * 100),
            }))
        ),
      2000
    )
  );

// Lazy loaded components
const UserProfile = React.lazy(() =>
  fetchUserProfile().then(
    // @ts-ignore
    (data: {
      name: string;
      email: string;
      stats: { posts: number; followers: number; following: number };
    }) => ({
      default: ({ onNavigate }: { onNavigate: () => void }) => (
        <View style={styles.profileCard}>
          <Text style={styles.profileName}>{data.name}</Text>
          <Text style={styles.profileEmail}>{data.email}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{data.stats.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{data.stats.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{data.stats.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
          <Pressable style={styles.button} onPress={onNavigate}>
            <Text style={styles.buttonText}>View Posts</Text>
          </Pressable>
        </View>
      ),
    })
  )
);

const UserPosts = React.lazy(() =>
  fetchUserPosts().then(
    // @ts-ignore
    (
      posts: { id: number; title: string; content: string; likes: number }[]
    ) => ({
      default: () => (
        <ScrollView style={styles.postsContainer}>
          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postContent}>{post.content}</Text>
              <Text style={styles.postLikes}>❤️ {post.likes}</Text>
            </View>
          ))}
        </ScrollView>
      ),
    })
  )
);

// Advanced useLayoutEffect example: Animated Header
const AnimatedHeader = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerRef = useRef(null);

  useLayoutEffect(() => {
    if (headerRef.current) {
      // Measure header height immediately to prevent layout jumps
      // @ts-ignore
      headerRef.current.measure(
        (x: number, y: number, width: number, height: number) => {
          setHeaderHeight(height);
        }
      );
    }
  }, []);

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight / 2, headerHeight],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  return (
    <View>
      <Animated.View
        ref={headerRef}
        style={[
          styles.animatedHeader,
          {
            transform: [{ translateY: headerTranslate }],
            opacity: headerOpacity,
          },
        ]}
      >
        <Text style={styles.headerText}>Animated Header</Text>
      </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        style={styles.scrollContent}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <View key={i} style={styles.scrollItem}>
            <Text>Scroll Item {i + 1}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const AdvanceUsecase = () => {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab: string) => {
    setIsLoading(true);
    // Use transition for tab changes to keep UI responsive
    startTransition(() => {
      setActiveTab(tab);
      setIsLoading(false);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeader}>Advanced React Patterns</Text>

      {/* Animated Header Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          useLayoutEffect: Animated Header
        </Text>
        <View style={styles.headerContainer}>
          <AnimatedHeader />
        </View>
      </View>

      {/* Profile & Posts Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          useTransition & Suspense: Social Profile
        </Text>

        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, activeTab === "profile" && styles.activeTab]}
            onPress={() => handleTabChange("profile")}
          >
            <Text style={styles.tabText}>Profile</Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === "posts" && styles.activeTab]}
            onPress={() => handleTabChange("posts")}
          >
            <Text style={styles.tabText}>Posts</Text>
          </Pressable>
        </View>

        {isPending && (
          <View style={styles.transitionLoading}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text>Switching tabs...</Text>
          </View>
        )}

        <Suspense
          fallback={
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text>Loading content...</Text>
            </View>
          }
        >
          {activeTab === "profile" ? (
            <UserProfile onNavigate={() => handleTabChange("posts")} />
          ) : (
            <UserPosts />
          )}
        </Suspense>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  mainHeader: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  // Animated Header styles
  headerContainer: {
    height: 300,
  },
  animatedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#007AFF",
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollContent: {
    flexGrow: 1,
  },
  scrollItem: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  // Tab Navigation styles
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  tabText: {
    color: "#333",
    fontWeight: "500",
  },
  // Profile styles
  profileCard: {
    padding: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#666",
    marginTop: 5,
  },
  // Posts styles
  postsContainer: {
    padding: 15,
  },
  postCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postContent: {
    marginTop: 5,
    color: "#666",
  },
  postLikes: {
    marginTop: 10,
    color: "#666",
  },
  // Common styles
  button: {
    backgroundColor: "#007AFF",
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
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
  transitionLoading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 10,
  },
});

export default AdvanceUsecase;
