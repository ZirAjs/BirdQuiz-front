import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { WebView } from "react-native-webview";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Props {
  src: string;
  styles: any;
}

export function EmbedHtml({ src, styles }: Props) {
  const [loading, setLoading] = useState(true);

  const webViewRef = useRef<WebView>(null);

  const onLoadStart = () => setLoading(true);
  const onLoadEnd = () => setLoading(false);

  useEffect(() => {
    if (Platform.OS !== "web") {
      setLoading(true);
    }
  }, [src]);

  return (
    <ThemedView>
      {loading && <ThemedText>불러오는 중...</ThemedText>}
      {Platform.OS === "web" ? (
        <iframe src={src} style={styles} frameBorder="0" allowFullScreen />
      ) : (
        <WebView
          ref={webViewRef}
          source={{ uri: src }}
          style={styles}
          mixedContentMode="always"
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
          domStorageEnabled
          allowsFullscreenVideo
          startInLoadingState
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
        />
      )}
    </ThemedView>
  );
}
