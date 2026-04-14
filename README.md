# Gen Z Translator

**learn the lingo - no cap - fr fr**

A React Native (Expo) app that translates between Gen Z slang and normal English using Claude AI. Includes a flashcard learning mode and a quiz.

## Setup

### 1. Install dependencies

```bash
cd gen-z-translator
npm install
```

### 2. Get an Anthropic API key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Go to **API Keys** and create a new key
4. Copy the key

### 3. Add your API key

```bash
cp .env.example .env
```

Edit `.env` and paste your key:

```
EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

### 4. Run the app

```bash
npx expo start
```

- Press `i` to open in iOS Simulator
- Scan the QR code with Expo Go on your iPhone
- Press `a` for Android emulator

## Features

- **Translate** - Convert normal English to Gen Z slang (and back) using Claude AI
- **Learn** - Flashcards with 15 Gen Z terms, definitions, and examples
- **Quiz** - Multiple choice quiz to test your knowledge

## Tech Stack

- React Native + Expo
- Anthropic Claude API (claude-3-5-haiku)
- No external UI libraries - pure React Native components
