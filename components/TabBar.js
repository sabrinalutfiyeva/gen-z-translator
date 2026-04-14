import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const TABS = [
  { key: "translate", label: "TRANSLATE", emoji: "\uD83D\uDD04" },
  { key: "learn", label: "LEARN", emoji: "\uD83D\uDCDA" },
  { key: "quiz", label: "QUIZ", emoji: "\uD83C\uDFAE" },
];

export default function TabBar({ activeTab, onTabPress }) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onTabPress(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={styles.emoji}>{tab.emoji}</Text>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "transparent",
  },
  activeTab: {
    backgroundColor: "#FF2D78",
    borderColor: "#FF2D78",
  },
  emoji: {
    fontSize: 18,
    marginBottom: 4,
  },
  label: {
    color: "#888",
    fontWeight: "800",
    fontSize: 12,
    letterSpacing: 1,
  },
  activeLabel: {
    color: "#FFF",
  },
});
