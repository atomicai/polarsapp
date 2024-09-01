import React from 'react';
import { Link, Tabs, Redirect } from 'expo-router';
import { Pressable, Text } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import TabIcon from '@/components/icons/tabs';
import TabBarIcon from '@/components/icons/tabs/utils';

import { useSession } from '@/storage/ctx';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={20} style={{ marginBottom: -10 }} {...props} />;
// }

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const darkTheme = 'dark';

  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[darkTheme].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
        tabBarActiveBackgroundColor: Colors[darkTheme].navbarBackground,
        tabBarInactiveBackgroundColor: Colors[darkTheme].navbarBackground,
        tabBarStyle: { height: 60, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0 },
        tabBarLabelStyle: { marginBottom: 10, marginTop: -5 }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabBarIcon collection="feather" color={color} name="home" size={20} />
          )
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // )
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: 'Message',
          tabBarIcon: ({ color }) => (
            <TabBarIcon collection="feather" color={color} name="message-square" size={20} />
          )
        }}
      />
      <Tabs.Screen
        name="hot"
        options={{
          title: 'Hot',
          tabBarIcon: ({ color }) => (
            <TabBarIcon collection="font-awesome" color={color} name="hotjar" size={20} />
          )
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: 'Notification',
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              collection="ionicons"
              color={color}
              name="notifications-outline"
              size={20}
            />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <TabBarIcon collection="feather" color={color} name="user" size={20} />
          )
        }}
      />
    </Tabs>
  );
}
