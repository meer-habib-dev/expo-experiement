import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useId, useImperativeHandle, useRef } from "react";

const DummyTest = () => {
  const ref = useRef(null);
  const id = useId();
  console.log("id", id);
  const comRef = useRef(null);
  const scrollRef = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      scrollAndFocusAddComment() {
        scrollRef.current?.scrollToBottom();
        comRef.current?.focus();
      },
    };
  });
  useEffect(() => {
    // postRef.current.scrollAndFocusAddComment();
  }, []);
  return (
    <View>
      <Button
        title="hitme"
        ref={ref}
        onPress={() => ref.current?.scrollAndFocusAddComment()}
      />
      <Text>DummyTest</Text>
      <ScrollView>
        <View style={{ height: 2000, backgroundColor: "gray" }} />
        <TextInput
          ref={comRef}
          style={{ height: 100, backgroundColor: "red" }}
        />
      </ScrollView>
    </View>
  );
};

export default DummyTest;

const styles = StyleSheet.create({});
