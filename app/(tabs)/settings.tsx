import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "expo-image";

export interface Nav1Props {
  /** Used to locate this view in end-to-end tests. */
  testID?: string;
}

export default function SettingsView(props: Nav1Props) {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/search.jpg")}
          style={{ width: 400, aspectRatio: 1, alignSelf: "center" }}
        />
      }
    >
      <ThemedText>검색기능은 현재 개발중입니다. :)</ThemedText>
    </ParallaxScrollView>
  );
}
