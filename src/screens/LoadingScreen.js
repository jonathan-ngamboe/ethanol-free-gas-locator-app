import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";

export default function LoadingScreen() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}
