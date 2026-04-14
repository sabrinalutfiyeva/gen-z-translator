import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import TERMS from "../data/terms";

export default function LearnScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const term = TERMS[currentIndex];

  const goTo = (index) => {
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* Flashcard */}
      <View style={styles.card}>
        <Text style={styles.termText}>{term.term}</Text>

        <Text style={styles.label}>MEANS {"\u2192"}</Text>
        <Text style={styles.definition}>{term.definition}</Text>

        <View style={styles.cardDivider} />

        <Text style={styles.label}>EXAMPLE {"\u2192"}</Text>
        <Text style={styles.example}>{term.example}</Text>
      </View>

      {/* Navigation */}
      <View style={styles.navRow}>
        <TouchableOpacity
          style={styles.prevBtn}
          onPress={() => goTo(Math.max(0, currentIndex - 1))}
          activeOpacity={0.7}
          disabled={currentIndex === 0}
        >
          <Text style={[styles.navBtnText, currentIndex === 0 && styles.disabled]}>
            {"\u2190"} PREV
          </Text>
        </TouchableOpacity>

        <Text style={styles.counter}>
          {currentIndex + 1} / {TERMS.length}
        </Text>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => goTo(Math.min(TERMS.length - 1, currentIndex + 1))}
          activeOpacity={0.7}
          disabled={currentIndex === TERMS.length - 1}
        >
          <Text style={styles.navBtnText}>NEXT {"\u2192"}</Text>
        </TouchableOpacity>
      </View>

      {/* Term pills */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsContainer}
      >
        {TERMS.map((t, i) => (
          <TouchableOpacity
            key={t.id}
            style={[styles.pill, i === currentIndex && styles.activePill]}
            onPress={() => goTo(i)}
            activeOpacity={0.7}
          >
            <Text
              style={[styles.pillText, i === currentIndex && styles.activePillText]}
            >
              {t.term}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderColor: "#FF2D78",
    borderRadius: 18,
    padding: 28,
    marginBottom: 22,
    // Gradient-like dark bg
    backgroundColor: "#1A0A12",
  },
  termText: {
    color: "#FF2D78",
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 18,
  },
  label: {
    color: "#666",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  definition: {
    color: "#FFF",
    fontFamily: "Courier",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 4,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 18,
  },
  example: {
    color: "#FFF",
    fontFamily: "Courier",
    fontSize: 15,
    fontStyle: "italic",
    lineHeight: 24,
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  prevBtn: {
    backgroundColor: "#222",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  nextBtn: {
    backgroundColor: "#FF2D78",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  navBtnText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 13,
    letterSpacing: 0.5,
  },
  disabled: {
    color: "#555",
  },
  counter: {
    color: "#888",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Courier",
  },
  pillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingBottom: 20,
  },
  pill: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activePill: {
    backgroundColor: "#FF2D78",
    borderColor: "#FF2D78",
  },
  pillText: {
    color: "#888",
    fontFamily: "Courier",
    fontSize: 13,
    fontWeight: "600",
  },
  activePillText: {
    color: "#FFF",
  },
});
