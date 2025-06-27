import { useEffect, useRef, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { ThemedView } from "./ThemedView";

interface Props {
  src: string;
  hidden: boolean;
}

const defaultStyles = StyleSheet.create({
  embedStyle: {
    width: 290,
    height: 200,
  },
  hiddenStyle: {
    width: 290,
    height: 200,
    opacity: 0,
    position: "absolute", // removes from layout flow
  },
});

export function EmbedHtml({ src, hidden }: Props) {
  const [loading, setLoading] = useState(true);
  const [styles, setStyles] = useState<any>(
    hidden ? defaultStyles.hiddenStyle : defaultStyles.embedStyle
  );

  const webViewRef = useRef<WebView>(null);

  const onLoadStart = () => setLoading(true);
  const onLoadEnd = () => setLoading(false);

  useEffect(() => {
    if (Platform.OS !== "web") {
      setLoading(true);
    }
  }, [src]);

  useEffect(() => {
    if (hidden) {
      setStyles(defaultStyles.hiddenStyle);
    } else {
      setStyles(defaultStyles.embedStyle);
    }
  }, [hidden]);

  return (
    <ThemedView>
      {/* {loading && <ThemedText>불러오는 중...</ThemedText>} */}
      {Platform.OS === "web" ? (
        <iframe
          src={src}
          style={styles}
          frameBorder="0"
          allowFullScreen
          hidden={hidden}
        />
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
          // onLoadStart={onLoadStart}
          // onLoadEnd={onLoadEnd}
        />
      )}
    </ThemedView>
  );
}
