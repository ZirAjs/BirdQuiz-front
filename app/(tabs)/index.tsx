import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Image, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <ThemedScrollView contentContainerStyle={styles.container}>
      {/* title */}
      <ThemedView style={styles.header}>
        <ThemedText type="title">7일째 새 보는 중</ThemedText>
        <Image
          source={require("@/assets/images/chick.png")}
          style={styles.headerIcon}
        />
      </ThemedView>

      <ThemedView style={styles.hr} />

      {/* location */}
      <ThemedView style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          서울숲
        </ThemedText>
        <ThemedText type="default" style={styles.description}>
          18°C , 흐림. 최근 큰유리새, 뱁새, 참새 등 20종이 관찰됨
        </ThemedText>
      </ThemedView>

      {/* dailybird */}
      <ThemedView style={styles.todayBirdBox}>
        <Image
          source={require("@/assets/images/dailybird.png")}
          style={styles.todayBirdImage}
        />
        <ThemedView
          style={{ flex: 1, backgroundColor: Colors.global.backgroundDark }}
        >
          <ThemedText type="defaultSemiBold">오늘의 새</ThemedText>
          <ThemedText>참새</ThemedText>
        </ThemedView>
        <ThemedText>100m</ThemedText>
      </ThemedView>

      {/* rare birds */}
      <ThemedView style={styles.section}>
        <ThemedText type="defaultSemiBold">희귀조</ThemedText>
        <ThemedText>모월 모일 - [무슨 새]</ThemedText>
        <ThemedText>모월 모일 - [무슨 새]</ThemedText>
      </ThemedView>

      {/* unfamilar birds */}
      <ThemedView style={styles.section}>
        <ThemedText type="defaultSemiBold">나랑 안 친한 새들</ThemedText>
        <ThemedText>[무슨 새]</ThemedText>
        <ThemedText>[무슨 새]</ThemedText>
      </ThemedView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  hr: {
    height: 3,
    backgroundColor: Colors.global.primary,
    width: "50%",
    alignSelf: "center",
  },
  section: {},
  sectionTitle: {
    marginBottom: 4,
  },
  description: {
    color: "#222",
  },
  todayBirdBox: {
    backgroundColor: Colors.global.backgroundDark,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  todayBirdImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
