import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import TERMS from "../data/terms";

// Shuffle helper (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build a quiz question: pick 1 correct + 3 wrong definitions
function makeQuestion(terms) {
  const shuffled = shuffle(terms);
  const correct = shuffled[0];
  const wrongs = shuffled.slice(1, 4);
  const options = shuffle([
    { text: correct.definition, correct: true },
    ...wrongs.map((w) => ({ text: w.definition, correct: false })),
  ]);
  return { term: correct.term, correctDef: correct.definition, options };
}

export default function QuizScreen() {
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [question, setQuestion] = useState(() => makeQuestion(TERMS));
  const [selected, setSelected] = useState(null); // index of tapped option
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (index) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    setTotal((t) => t + 1);
    if (question.options[index].correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setQuestion(makeQuestion(TERMS));
    setSelected(null);
    setAnswered(false);
  };

  const getOptionStyle = (index) => {
    if (!answered) return styles.option;
    const opt = question.options[index];
    if (opt.correct) return [styles.option, styles.correct];
    if (index === selected && !opt.correct) return [styles.option, styles.wrong];
    return styles.option;
  };

  const getOptionTextStyle = (index) => {
    if (!answered) return styles.optionText;
    const opt = question.options[index];
    if (opt.correct) return [styles.optionText, { color: "#FFF" }];
    if (index === selected && !opt.correct) return [styles.optionText, { color: "#FFF" }];
    return [styles.optionText, { color: "#555" }];
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Score */}
      <View style={styles.scoreRow}>
        <Text style={styles.scoreLabel}>SCORE</Text>
        <Text style={styles.scoreValue}>
          {score} / {total}
        </Text>
      </View>

      {/* Question card */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>WHAT DOES THIS MEAN?</Text>
        <Text style={styles.termText}>{question.term}</Text>
      </View>

      {/* Answer options */}
      {question.options.map((opt, i) => (
        <TouchableOpacity
          key={i}
          style={getOptionStyle(i)}
          onPress={() => handleAnswer(i)}
          activeOpacity={0.7}
          disabled={answered}
        >
          <Text style={getOptionTextStyle(i)}>{opt.text}</Text>
        </TouchableOpacity>
      ))}

      {/* Next button */}
      {answered && (
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.8}>
          <Text style={styles.nextBtnText}>NEXT {"\u2192"}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  scoreLabel: {
    color: "#888",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },
  scoreValue: {
    color: "#FF2D78",
    fontSize: 28,
    fontWeight: "900",
  },
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 18,
    padding: 30,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#222",
  },
  cardLabel: {
    color: "#666",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 14,
    textTransform: "uppercase",
  },
  termText: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
  },
  option: {
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  correct: {
    backgroundColor: "#1B5E20",
    borderColor: "#4CAF50",
  },
  wrong: {
    backgroundColor: "#7F1D1D",
    borderColor: "#EF5350",
  },
  optionText: {
    color: "#FFF",
    fontFamily: "Courier",
    fontSize: 15,
    lineHeight: 22,
  },
  nextBtn: {
    backgroundColor: "#FF2D78",
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
  },
  nextBtnText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 15,
    letterSpacing: 0.5,
  },
});
