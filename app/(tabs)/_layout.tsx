import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { View } from 'react-native';

const DARK_BG = '#000';

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: DARK_BG }}>
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf="house.fill" />
        <Label hidden />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="create">
        <Icon sf="plus" />
        <Label hidden />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Icon sf="person.fill" />
        <Label hidden />
      </NativeTabs.Trigger>
    </NativeTabs>
    </View>
  );
}
