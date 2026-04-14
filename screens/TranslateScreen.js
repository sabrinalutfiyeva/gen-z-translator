import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Keyboard,
} from "react-native";
import { lookupSlang } from "../data/urbanDictionary";

const API_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;

// Calls Claude API with the given system prompt and user text
async function translate(systemPrompt, userText) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: userText }],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.content[0].text;
}

const TO_GENZ_PROMPT =
  "You are a Gen Z translator. Convert the input text into authentic Gen Z slang. Use words like 'no cap', 'slay', 'it's giving', 'lowkey', 'bussin', 'periodt', 'rent free', 'understood the assignment', etc. Keep it fun and authentic. Return only the translated text.";
const TO_NORMAL_PROMPT =
  "You are a translator. Convert the Gen Z slang input into plain, clear English that anyone can understand. Return only the translated text.";

export default function TranslateScreen() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [udResult, setUdResult] = useState(null);
  const [udLoading, setUdLoading] = useState(false);

  const handleTranslate = async (direction) => {
    if (!input.trim()) return;
    Keyboard.dismiss();
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const prompt = direction === "genz" ? TO_GENZ_PROMPT : TO_NORMAL_PROMPT;
      const result = await translate(prompt, input.trim());
      setOutput(result);
    } catch (e) {
      setError("oops, something went wrong bestie \uD83D\uDE2D try again?");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Label */}
      <Text style={styles.sectionLabel}>YOUR TEXT \u270D\uFE0F</Text>

      {/* Input */}
      <TextInput
        style={styles.input}
        placeholder="Type something here..."
        placeholderTextColor="#555"
        multiline
        value={input}
        onChangeText={setInput}
        textAlignVertical="top"
      />

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.genzBtn}
          onPress={() => handleTranslate("genz")}
          activeOpacity={0.8}
          disabled={loading}
        >
          <Text style={styles.btnText}>{"\u2192"} TO GEN Z \uD83D\uDD25</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.normalBtn}
          onPress={() => handleTranslate("normal")}
          activeOpacity={0.8}
          disabled={loading}
        >
          <Text style={styles.btnText}>{"\u2192"} TO NORMAL {"\uD83D\uDE10"}</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Output */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF2D78" />
          <Text style={styles.loadingText}>translating... \u2728</Text>
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : output ? (
        <Text style={styles.output}>{output}</Text>
      ) : (
        <Text style={styles.placeholder}>
          type something and hit translate bestie \uD83D\uDC85
        </Text>
      )}

      {/* Urban Dictionary Lookup */}
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.udBtn}
        onPress={async () => {
          if (!input.trim()) return;
          Keyboard.dismiss();
          setUdLoading(true);
          setUdResult(null);
          const result = await lookupSlang(input.trim());
          setUdResult(result);
          setUdLoading(false);
        }}
        activeOpacity={0.8}
        disabled={udLoading}
      >
        <Text style={styles.udBtnText}>
          {"\uD83D\uDCD6"} LOOK UP ON URBAN DICTIONARY
        </Text>
      </TouchableOpacity>

      {udLoading && (
        <ActivityIndicator size="small" color="#FF2D78" style={{ marginTop: 12 }} />
      )}
      {udResult && (
        <View style={styles.udCard}>
          <Text style={styles.udTerm}>{udResult.term}</Text>
          <Text style={styles.udDef}>{udResult.definition}</Text>
          {udResult.example ? (
            <Text style={styles.udExample}>{udResult.example}</Text>
          ) : null}
          <Text style={styles.udVotes}>
            {"\uD83D\uDC4D"} {udResult.thumbsUp} {"\u00B7"} by {udResult.author}
          </Text>
        </View>
      )}
      {udResult === null && !udLoading && input.trim() === "" ? null : udResult === null && !udLoading ? (
        <Text style={styles.placeholder}>no results found on urban dictionary</Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionLabel: {
    color: "#CCC",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#1A1A1A",
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 14,
    color: "#FFF",
    fontFamily: "Courier",
    fontSize: 15,
    padding: 18,
    minHeight: 130,
    marginBottom: 18,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  genzBtn: {
    flex: 1,
    backgroundColor: "#FF2D78",
    paddingVertical: 20,
    borderRadius: 14,
    alignItems: "center",
  },
  normalBtn: {
    flex: 1,
    backgroundColor: "#222",
    paddingVertical: 20,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  btnText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 22,
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  loadingText: {
    color: "#888",
    fontFamily: "Courier",
    marginTop: 12,
    fontSize: 14,
  },
  output: {
    color: "#FFF",
    fontFamily: "Courier",
    fontSize: 16,
    lineHeight: 26,
  },
  errorText: {
    color: "#FF6B6B",
    fontFamily: "Courier",
    fontSize: 14,
    textAlign: "center",
  },
  placeholder: {
    color: "#555",
    fontFamily: "Courier",
    fontSize: 14,
  },
  udBtn: {
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 14,
  },
  udBtnText: {
    color: "#CCC",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.5,
  },
  udCard: {
    backgroundColor: "#1A0A12",
    borderWidth: 1,
    borderColor: "#FF2D78",
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
  },
  udTerm: {
    color: "#FF2D78",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 10,
  },
  udDef: {
    color: "#FFF",
    fontFamily: "Courier",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
  },
  udExample: {
    color: "#AAA",
    fontFamily: "Courier",
    fontSize: 13,
    fontStyle: "italic",
    lineHeight: 20,
    marginBottom: 10,
  },
  udVotes: {
    color: "#666",
    fontSize: 12,
  },
});
