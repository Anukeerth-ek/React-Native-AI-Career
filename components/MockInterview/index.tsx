import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, ScrollView } from 'react-native';
import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';
import { styled } from 'nativewind';
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { View as RNView, Text as RNText, Image, TouchableOpacity } from "react-native";
const MOCK_QUESTION = "Tell me about yourself.";

const MockInterview = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
const SafeArea = styled(RNSafeAreaView);
const View = styled(RNView);
  const Text = styled(RNText);
  // const ScrollView = styled(RNScrollView)
  // Handle speech results
  useEffect(() => {
    Voice.onSpeechResults = e => {
      if (e.value && e.value.length > 0) {
        setTranscript(e.value[0]);
      }
      setIsListening(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const playQuestion = () => {
    Tts.speak(MOCK_QUESTION);
  };

  const startListening = async () => {
    try {
      setTranscript('');
      setFeedback('');
      setIsListening(true);
      await Voice.start('en-US');
    } catch (err) {
      console.error(err);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (err) {
      console.error(err);
    }
  };

  const getFeedback = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://YOUR_BACKEND_ENDPOINT/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: MOCK_QUESTION,
          answer: transcript,
        }),
      });

      const data = await response.json();
      setFeedback(data?.feedback || 'No feedback returned.');
    } catch (err) {
      console.error(err);
      setFeedback('Error getting feedback.');
    }
    setLoading(false);
  };

  return (
    <ScrollView style={{ padding: 16, backgroundColor: 'white', flex: 1 }}>
      <Text className="text-xl font-bold mb-2">🎤 Mock Interview</Text>

      <Text className="text-base mb-2">Question:</Text>
      <Text className="text-lg font-semibold mb-4">{MOCK_QUESTION}</Text>

      <Button title="Play Question (TTS)" onPress={playQuestion} />

      <View className="my-4">
        {isListening ? (
          <Button title="Stop Listening" onPress={stopListening} />
        ) : (
          <Button title="Start Speaking" onPress={startListening} />
        )}
      </View>

      <Text className="text-base font-semibold mt-2 mb-1">Your Response:</Text>
      <Text className="p-2 bg-gray-100 rounded">{transcript || 'No response yet.'}</Text>

      <View className="mt-4 mb-2">
        <Button
          title="Get AI Feedback"
          onPress={getFeedback}
          disabled={!transcript || loading}
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#6B46C1" />}

      {feedback ? (
        <>
          <Text className="text-base font-semibold mt-4 mb-1">AI Feedback:</Text>
          <Text className="p-2 bg-green-100 rounded">{feedback}</Text>
        </>
      ) : null}
    </ScrollView>
  );
};

export default MockInterview;
