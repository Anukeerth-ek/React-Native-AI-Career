import React, { useState } from "react";
import {
     View,
     Text,
     TextInput,
     TouchableOpacity,
     ScrollView,
     KeyboardAvoidingView,
     Platform,
     ActivityIndicator,
     StyleSheet,
     SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CareerScreen = () => {
     const [resume, setResume] = useState("");
     const [query, setQuery] = useState("");
     const [messages, setMessages] = useState<any>([]);
     const [loading, setLoading] = useState(false);

  const sendQuery = async () => {
       console.log("anu check", resume, query)
          if ( !query) return;

          const userMsg = { sender: "user", text: query };
          setMessages((prev: any) => [...prev, userMsg]);
          setLoading(true);
          setQuery("");

          try {
               const response = await fetch("http://10.0.2.2:3000/career/ask-chatbot", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify({  query }),
               });

               const data = await response.json();
               console.log("data", data);

               const botMsg = {
                    sender: "bot",
                    text: data.message,
               };

               setMessages((prev: any) => [...prev, botMsg]);
          } catch (err) {
               setMessages((prev: any) => [...prev, { sender: "bot", text: "⚠️ Failed to get a response." }]);
          } finally {
               setLoading(false);
          }
     };

     return (
          <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
               <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
               >
                    <View style={{ flex: 1 }}>
                         <KeyboardAwareScrollView
                              contentContainerStyle={styles.chatContainer}
                              enableOnAndroid={true}
                              extraScrollHeight={100}
                              keyboardShouldPersistTaps="handled"
                         >
                              {messages.map((msg: any, index: number) => (
                                   <View
                                        key={index}
                                        style={[
                                             styles.messageBubble,
                                             msg.sender === "user" ? styles.userBubble : styles.botBubble,
                                        ]}
                                   >
                                        <Text style={styles.messageText}>{msg.text}</Text>
                                   </View>
                              ))}

                              {loading && (
                                   <View style={styles.botBubble}>
                                        <ActivityIndicator size="small" color="#000" />
                                        <Text style={styles.messageText}>Thinking...</Text>
                                   </View>
                              )}
                         </KeyboardAwareScrollView>

                         {/* ⬇️ Move inputContainer outside the scroll view */}
                         <View style={styles.inputContainer}>
                              {/* <TextInput
                                   placeholder="Enter resume summary..."
                                   value={resume}
                                   onChangeText={setResume}
                                   style={styles.input}
                                   multiline
                              /> */}
                              <TextInput
                                   placeholder="Ask a question..."
                                   value={query}
                                   onChangeText={setQuery}
                                   style={styles.input}
                              />
                              <TouchableOpacity style={styles.sendButton} onPress={sendQuery}>
                                   <Text style={{ color: "white" }}>Send</Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               </KeyboardAvoidingView>
          </SafeAreaView>
     );
};

export default CareerScreen;

const styles = StyleSheet.create({
     chatContainer: {
          position: "relative",
          padding: 16,
          paddingBottom: 130,
     },
     messageBubble: {
          maxWidth: "80%",
          padding: 12,
          marginVertical: 8,
          borderRadius: 12,
     },
     userBubble: {
          alignSelf: "flex-end",
          backgroundColor: "#DCF8C6",
     },
     botBubble: {
          alignSelf: "flex-start",
          backgroundColor: "#F0F0F0",
     },
     messageText: {
          fontSize: 16,
     },
     inputContainer: {
          position: "absolute",
          //  top: 0,
          bottom: 0,
          width: "100%",
          padding: 12,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#ddd",
     },
     input: {
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          marginBottom: 10,
          backgroundColor: "#fafafa",
     },
     sendButton: {
          backgroundColor: "#007AFF",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
     },
});
