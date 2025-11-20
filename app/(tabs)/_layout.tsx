// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import BottomTabBar from '../../components/BottomTabBar';

function TabLabel({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text className={focused ? 'text-white text-xs font-semibold' : 'text-zinc-400 text-xs'}>
      {label}
    </Text>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarLabel: ({ focused }) => <TabLabel label="Início" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="decks"
        options={{
          title: 'Decks',
          tabBarLabel: ({ focused }) => <TabLabel label="Decks" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="coach"
        options={{
          title: 'Coach',
          tabBarLabel: ({ focused }) => <TabLabel label="Coach" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarLabel: ({ focused }) => <TabLabel label="Perfil" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
