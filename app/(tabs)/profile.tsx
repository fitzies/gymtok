import { LinearGradient } from 'expo-linear-gradient';
import { useRef } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_PAD = 16;
const GRID_GAP = 4;
const NUM_COLS = 3;
const TILE_WIDTH = (SCREEN_WIDTH - GRID_PAD * 2 - GRID_GAP * (NUM_COLS - 1)) / NUM_COLS;
const TILE_HEIGHT = TILE_WIDTH * (16 / 9);
const HEADER_HEIGHT = SCREEN_WIDTH; // aspectRatio 1:1

const DARK = {
  bg: '#000',
  surface: '#1a1a1a',
  text: '#fff',
  textMuted: '#888',
  border: '#333',
};

export default function ProfileScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const visibleHeaderHeight = HEADER_HEIGHT - 60;

  const imageScale = scrollY.interpolate({
    inputRange: [-HEADER_HEIGHT, 0],
    outputRange: [2, 1],
    extrapolateRight: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, visibleHeaderHeight],
    outputRange: [0, -visibleHeaderHeight],
    extrapolateRight: 'clamp',
  });

  return (
    <View style={{ flex: 1, backgroundColor: DARK.bg }}>
      <Animated.View
        style={[
          styles.pictureWrapper,
          styles.pictureWrapperSticky,
          { transform: [{ translateY: headerTranslateY }] },
        ]}
      >
        <Animated.Image
          source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80' }}
          style={[
            styles.picture,
            { transform: [{ scale: imageScale }] },
          ]}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'transparent']}
          style={styles.fadeOverlay}
        />
        <View style={styles.textBlock}>
          <Text style={styles.greeting}>oli</Text>
          <Text style={styles.handle}>@olifmov</Text>
        </View>
      </Animated.View>
      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.container, { paddingTop: visibleHeaderHeight }]}
        contentInsetAdjustmentBehavior="never"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.stats}>
          <Text style={[styles.stat, { color: DARK.text }]}>8 following</Text>
          <Text style={[styles.stat, { color: DARK.text }]}>•</Text>
          <Text style={[styles.stat, { color: DARK.text }]}>22 followers</Text>
          <Text style={[styles.stat, { color: DARK.text }]}>•</Text>
          <Text style={[styles.stat, { color: DARK.text }]}>310kg </Text>
        </View>
        <View style={styles.actions}>
          <Pressable style={[styles.actionButton, { backgroundColor: DARK.surface }]}>
            <Text style={[styles.actionButtonText, { color: DARK.text }]}>Edit</Text>
          </Pressable>
          <Pressable style={[styles.actionButton, { backgroundColor: DARK.surface }]}>
            <Text style={[styles.actionButtonText, { color: DARK.text }]}>Share</Text>
          </Pressable>
        </View>
        <View style={styles.workoutsGrid}>
          {Array.from({ length: 1 }, (_, i) => (
            <View key={i} style={styles.workoutCell}>
              <Text style={styles.workoutCellPlus}>+</Text>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  pictureWrapper: {
    width: '100%',
    height: HEADER_HEIGHT,
    position: 'relative',
    overflow: 'hidden',
    marginTop: -60,
    borderRadius: 24,
  },
  pictureWrapperSticky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: 24,
  },
  fadeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  textBlock: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'column',
    padding: 8,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  handle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  stats: {
    flexDirection: 'row',
    gap: 4,
    padding: 16,
  },
  stat: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  workoutsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: GRID_PAD,
    paddingTop: 24,
    gap: GRID_GAP,
  },
  workoutCell: {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutCellPlus: {
    fontSize: 32,
    color: '#555',
    fontWeight: '300',
  },
});
