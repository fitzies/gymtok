import { Feather } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

type PostProps = {
  username: string;
  location?: string;
  workoutType: string;
  timeAgo: string;
  photoUrl?: string;
  postText: string;
  likes: number;
  comments: number;
  duration?: number;
  rating?: number;
  exerciseCount?: number;
  totalSets?: number;
};

const INTENSITY_LABELS: Record<number, string> = {
  1: "Lightweight",
  2: "Moderate",
  3: "Challenging",
  4: "Intense",
  5: "Very Intense",
};

function formatDuration(ms: number): string {
  const mins = Math.round(ms / 60000);
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export default function Post({
  username,
  location,
  workoutType,
  timeAgo,
  photoUrl,
  postText,
  likes,
  comments,
  duration,
  rating,
  exerciseCount,
  totalSets,
}: PostProps) {
  return (
    <View style={{ flexDirection: "column" }}>
      <View style={{ flexDirection: "row", paddingLeft: 6, paddingRight: 12, paddingVertical: 10, alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={{ width: 34, height: 34, borderRadius: 20, backgroundColor: "blue" }} />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ color: "white", fontWeight: "800" }}>{username}</Text>
            <Text style={{ color: "#aaa", fontSize: 12 }}>
              {location ? `${location} • ` : ""}{workoutType} • {timeAgo}
            </Text>
          </View>
        </View>
        <Feather name="more-horizontal" size={24} color="white" />
      </View>
      {photoUrl && (
        <Image
          source={{ uri: photoUrl }}
          style={{ width: "100%", aspectRatio: 0.8, borderRadius: 24 }}
          resizeMode="cover"
        />
      )}
      <View style={{ flexDirection: "row", paddingLeft: 8, paddingRight: 12, paddingTop: 10, paddingBottom: 4, gap: 12 }}>
        {duration !== undefined && (
          <Text style={{ color: "#888", fontSize: 12 }}>{formatDuration(duration)}</Text>
        )}
        {exerciseCount !== undefined && (
          <Text style={{ color: "#888", fontSize: 12 }}>{exerciseCount} exercises</Text>
        )}
        {totalSets !== undefined && (
          <Text style={{ color: "#888", fontSize: 12 }}>{totalSets} sets</Text>
        )}
        {rating !== undefined && (
          <Text style={{ color: "#888", fontSize: 12 }}>{INTENSITY_LABELS[rating] ?? `${rating}/5`}</Text>
        )}
      </View>
      <View style={{ flexDirection: "row", paddingLeft: 8, paddingRight: 12, paddingTop: 2, paddingBottom: 10, gap: 4 }}>
        <Text style={{ color: "white", fontWeight: "800" }}>@{username}</Text>
        <Text style={{ color: "white" }}>{postText}</Text>
      </View>
    </View>
  );
}