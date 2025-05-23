import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveBackgroundColor: Colors.global.background,
        tabBarInactiveBackgroundColor: Colors.global.background,
        tabBarActiveTintColor: Colors.global.primary,
        tabBarInactiveTintColor: Colors.global.primaryLight,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: Colors.global.background,
          borderTopWidth: 0,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "SUITMedium",
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="exercise"
        options={{
          title: "Exercise",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="questionmark.circle.fill"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="safari.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
