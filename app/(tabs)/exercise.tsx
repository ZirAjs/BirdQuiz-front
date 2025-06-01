import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";

import { Card } from "@/components/Card";

export default function ExerciseView() {
  const router = useRouter();
  return (
    <ThemedScrollView>
      <ThemedText style={styles.title} type="title">
        동정 연습하기
      </ThemedText>
      <Card
        imagesrc={require("@/assets/images/suddenly.jpg")}
        content="어느 새"
        onClick={() => {
          console.log("Card clicked");
          router.push("/quiz");
        }}
      ></Card>
      <Card
        imagesrc={require("@/assets/images/audio.jpg")}
        content="오늘 운새"
        onClick={() => {
          console.log("Card clicked");
          router.push("/quiz");
        }}
      ></Card>
      <Card
        imagesrc={require("@/assets/images/seeagain.jpg")}
        content="다시 봅새"
        onClick={() => {
          console.log("Card clicked");
          router.push("/quiz");
        }}
      ></Card>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    margin: 10,
    fontSize: 30,
    paddingTop: 80,
    paddingBottom: 40,
  },
});
