import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DotMenu from "./DotMenu";
import { getMenuItems } from "../utils/utils";
import { useTheme } from "../context/ThemeContext";
import { View, Pressable } from "react-native";
import { useStation } from "../context/StationContext";
import { useState } from "react";

export default function StationViewHeader() {
  const { theme } = useTheme();
  const {
    activeStation,
    favoriteStations,
    addFavoriteStation,
    removeFavoriteStation,
    pendingOperations,
  } = useStation();
  const [isEditingFavorites, setIsEditingFavorites] = useState(
    pendingOperations.has(`add-${activeStation?.id}`) ||
      pendingOperations.has(`remove-${activeStation?.id}`)
  );

  return (
    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
      <Pressable
        onPress={() =>
          favoriteStations.some(
            (favorite) => String(favorite.id) === String(activeStation?.id)
          )
            ? removeFavoriteStation(activeStation?.id)
            : addFavoriteStation(activeStation?.id)
        }
        disabled={isEditingFavorites}
      >
        <Icon
          name={
            favoriteStations.some(
              (favorite) => String(favorite.id) === String(activeStation?.id)
            )
              ? "heart"
              : "heart-outline"
          }
          size={24}
          style={{ marginRight: 20 }}
          color={theme.colors.primary}
        />
      </Pressable>
      <DotMenu
        items={getMenuItems(null, ["share", "report"])}
        color={theme.colors.primary}
        style={{ marginRight: 20 }}
      />
    </View>
  );
}
