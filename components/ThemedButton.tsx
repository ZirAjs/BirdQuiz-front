import { Colors } from "@/constants/Colors";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { SFSymbols6_0 } from "sf-symbols-typescript";
import { ThemedText } from "./ThemedText";
import { IconSymbol } from "./ui/IconSymbol";

export type ThemedButtonProps =
  | {
      title: string;
      icon?: SFSymbols6_0;
      onPress: () => void;
    } & TouchableOpacityProps;

export function ThemedButton(props: ThemedButtonProps) {
  return (
    <TouchableOpacity {...props} style={styles.button}>
      {props.icon && (
        <IconSymbol
          name={props.icon}
          color={Colors.global.primary}
          style={styles.icon}
        />
      )}
      <ThemedText style={styles.text}>{props.title}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.global.backgroundDark,
    width: "100%",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // vertical centering
    marginVertical: 10,
  },
  icon: {
    marginRight: 5,
  },
  text: {
    color: Colors.global.text,
    fontSize: 16,
  },
});
