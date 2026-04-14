import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import TabBar from "./components/TabBar";
import TranslateScreen from "./screens/TranslateScreen";
import LearnScreen from "./screens/LearnScreen";
import QuizScreen from "./screens/QuizScreen";

// Randomize header emojis per tab for fun
const HEADER_EMOJIS = {
  translate: ["\uD83D\uDD25", "\u2728", "\uD83D\uDC80"],
  learn: ["\uD83D\uDC85", "\u26A1", "\uD83E\uDDE0"],
  quiz: ["\uD83C\uDFAE", "\uD83D\uDCA5", "\uD83E\uDD29"],
};

export default function App() {
  const [activeTab, setActiveTab] = useState("translate");
  const emojis = HEADER_EMOJIS[activeTab] || HEADER_EMOJIS.translate;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      {/* Pink decorative header bar */}
      <View style={styles.pinkBar}>
        {emojis.map((e, i) => (
          <Text key={i} style={styles.pinkBarEmoji}>
            {e}
          </Text>
        ))}
      </View>

      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>GEN Z</Text>
        <Text style={styles.subtitle}>TRANSLATOR {"\uD83D\uDC80"}</Text>
        <Text style={styles.tagline}>learn the lingo {"\u2022"} no cap {"\u2022"} fr fr</Text>

        {/* Tab bar */}
        <TabBar activeTab={activeTab} onTabPress={setActiveTab} />

        {/* Active screen */}
        <View style={styles.content}>
          {activeTab === "translate" && <TranslateScreen />}
          {activeTab === "learn" && <LearnScreen />}
          {activeTab === "quiz" && <QuizScreen />}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#111111",
  },
  pinkBar: {
    backgroundColor: "#FF2D78",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
  },
  pinkBarEmoji: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    color: "#FF2D78",
    fontSize: 48,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 2,
  },
  subtitle: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 6,
  },
  tagline: {
    color: "#888",
    fontFamily: "Courier",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 22,
    letterSpacing: 1,
  },
  content: {
    flex: 1,
  },
});
