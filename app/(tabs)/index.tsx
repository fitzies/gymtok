import { HugeiconsIcon } from '@hugeicons/react-native';
import { Search01Icon, UserAdd01Icon } from '@hugeicons/core-free-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Post from '../components/post';

type Tab = 'friends' | 'forYou';

const DUMMY_POSTS = [
  { username: 'julia.law', location: 'Seattle, Greenwood', workoutType: 'Chest', timeAgo: '43m ago', photoUrl: 'https://picsum.photos/400/401', postText: 'Hit a new PR on bench today 💪', likes: 24, comments: 5, duration: 3600000, rating: 5, exerciseCount: 5, totalSets: 18 },
  { username: 'mike.gym', location: 'Portland, Pearl', workoutType: 'Back', timeAgo: '1h ago', photoUrl: 'https://picsum.photos/400/402', postText: 'Deadlift day never disappoints', likes: 89, comments: 12, duration: 4500000, rating: 4, exerciseCount: 6, totalSets: 22 },
  { username: 'sarah.fit', location: 'Austin, South Congress', workoutType: 'Push', timeAgo: '2h ago', photoUrl: 'https://picsum.photos/400/403', postText: 'Shoulder press feeling strong', likes: 156, comments: 23, duration: 3000000, rating: 4, exerciseCount: 4, totalSets: 16 },
  { username: 'alex.lifts', location: 'Denver, RiNo', workoutType: 'Pull', timeAgo: '3h ago', photoUrl: 'https://picsum.photos/400/404', postText: 'Rows for the soul', likes: 42, comments: 8, duration: 3300000, rating: 3, exerciseCount: 5, totalSets: 20 },
  { username: 'emma.run', location: 'SF, Mission', workoutType: 'Legs', timeAgo: '4h ago', photoUrl: 'https://picsum.photos/400/405', postText: 'Squats and lunges done', likes: 201, comments: 34, duration: 4200000, rating: 5, exerciseCount: 6, totalSets: 24 },
  { username: 'chris.cardio', location: 'LA, Silver Lake', workoutType: 'Upper', timeAgo: '5h ago', photoUrl: 'https://picsum.photos/400/406', postText: 'Upper body pump achieved', likes: 67, comments: 9, duration: 2700000, rating: 3, exerciseCount: 4, totalSets: 14 },
  { username: 'jordan.strong', location: 'Chicago, Wicker Park', workoutType: 'Lower', timeAgo: '6h ago', photoUrl: 'https://picsum.photos/400/407', postText: 'Leg day complete', likes: 312, comments: 45, duration: 5400000, rating: 5, exerciseCount: 7, totalSets: 28 },
  { username: 'taylor.sweat', location: 'Miami, Wynwood', workoutType: 'Full Body', timeAgo: '7h ago', photoUrl: 'https://picsum.photos/400/408', postText: 'Full body circuit done', likes: 98, comments: 15, duration: 3600000, rating: 4, exerciseCount: 8, totalSets: 16 },
  { username: 'riley.yoga', location: 'NYC, Williamsburg', workoutType: 'Core', timeAgo: '8h ago', photoUrl: 'https://picsum.photos/400/409', postText: 'Core work and stretching', likes: 178, comments: 28, duration: 1800000, rating: 4, exerciseCount: 3, totalSets: 10 },
  { username: 'morgan.crossfit', location: 'Boston, Cambridge', workoutType: 'Arms', timeAgo: '9h ago', photoUrl: 'https://picsum.photos/400/410', postText: 'Bicep curls and tricep dips', likes: 234, comments: 41, duration: 2400000, rating: 3, exerciseCount: 5, totalSets: 20 },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('friends');
  const posts = activeTab === 'friends' ? DUMMY_POSTS.slice(0, 3) : DUMMY_POSTS.slice(3, 10);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tabs}>
          <Pressable
            onPress={() => setActiveTab('friends')}
            style={styles.tab}
          >
            <Text style={[styles.tabText, activeTab === 'friends' && styles.tabTextActive]}>
              Friends
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('forYou')}
            style={styles.tab}
          >
            <Text style={[styles.tabText, activeTab === 'forYou' && styles.tabTextActive]}>
              For You
            </Text>
          </Pressable>
        </View>
        <View style={styles.headerIcons}>
          <Pressable>
            <HugeiconsIcon icon={UserAdd01Icon} size={22} color="#fff" />
          </Pressable>
          <Pressable>
            <HugeiconsIcon icon={Search01Icon} size={24} color="#fff" />
          </Pressable>
        </View>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {posts.map((post, i) => (
          <View key={i} style={styles.postWrapper}>
            <Post {...post} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 90,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  tabs: {
    flexDirection: 'row',
    gap: 24,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  tab: {
    paddingVertical: 2,
  },
  tabText: {
    fontSize: 18,
    color: '#888',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '800',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  postWrapper: {
    marginBottom: 16,
  },
});
