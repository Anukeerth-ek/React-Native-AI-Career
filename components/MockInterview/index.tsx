import React, { useEffect, useState } from 'react';
import {
  View as RNView,
  Text as RNText,
  Button,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { styled } from 'nativewind';
import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

const MOCK_QUESTION = 'Tell me about yourself.';

const SafeArea = styled(RNSafeAreaView);
const View = styled(RNView);
const Text = styled(RNText);

const MockInterview = () => {
  const [mode, setMode] = useState<'text' | 'speech'>('speech');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

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
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const getFeedback = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:3000/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: MOCK_QUESTION,
          answer: transcript,
        }),
      });

      const data = await response.json();
      const feedbackText = data?.feedback || 'No feedback returned.';
      setFeedback(feedbackText);

      // If in speech mode, speak the feedback too
      if (mode === 'speech') {
        Tts.speak(feedbackText);
      }
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

      <Button
        title={mode === 'speech' ? 'Switch to Text Mode' : 'Switch to Speech Mode'}
        onPress={() => {
          setMode(mode === 'speech' ? 'text' : 'speech');
          setTranscript('');
          setFeedback('');
        }}
      />

      <View className="my-4">
        <Button title="Play Question (TTS)" onPress={playQuestion} />
      </View>

      {mode === 'speech' ? (
        <>
          <View className="my-4">
            {isListening ? (
              <Button title="Stop Listening" onPress={stopListening} />
            ) : (
              <Button title="Start Speaking" onPress={startListening} />
            )}
          </View>
        </>
      ) : (
        <View className="my-4">
          <TextInput
            multiline
            placeholder="Type your answer here..."
            value={transcript}
            onChangeText={setTranscript}
            style={{
              minHeight: 80,
              textAlignVertical: 'top',
              borderWidth: 1,
              borderColor: '#D1D5DB', // gray-300
              padding: 12, // p-3
              borderRadius: 8, // rounded
            }}
          />
        </View>
      )}

      <Text className="text-base font-semibold mt-2 mb-1">Your Response:</Text>
      <Text className="p-2 bg-gray-100 rounded">
        {transcript || 'No response yet.'}
      </Text>

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
