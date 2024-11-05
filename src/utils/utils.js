import { copyToClipboard } from "../navigation/ExternalNavigation";
import { useShowOnMap } from "./mapUtils";
import { share, openEmail } from "../navigation/ExternalNavigation";
import { contactEmail } from "../constants/generalConstants";
import { useStation } from "../context/StationContext";
import { useSnackbar } from "../context/SnackbarContext";
import { useState } from "react";

// Format the address
export const getFormattedAddress = (station) => {
  const parts = [
    station?.street_address,
    station?.city,
    station?.state && station?.zip ? `${station.state} ${station.zip}` : null,
  ].filter(Boolean);
  return parts.join(", ");
};

// Menu items
export const getMenuItems = (
  station = {},
  menuTypes = ["favorite", "map", "address"]
) => {
  const showOnMap = useShowOnMap();
  const { showSnackbar } = useSnackbar();
  const {
    favoriteStations,
    addFavoriteStation,
    removeFavoriteStation,
    loading,
    pendingOperations,
  } = useStation();

  const [isEditingFavorites, setIsEditingFavorites] = useState(
    pendingOperations.has(`add-${station?.id}`) ||
      pendingOperations.has(`remove-${station?.id}`)
  );

  const getFavoriteMenuItem = () => {
    if (!station?.id) {
      return null;
    }

    const isFavorite = favoriteStations.some(
      (favorite) => String(favorite.id) === String(station.id)
    );

    return {
      title: isFavorite ? "Remove from favorites" : "Add to favorites",
      icon: isFavorite ? "heart" : "heart-outline",
      onPress: async () => {
        if (loading || isEditingFavorites) return;

        try {
          if (isFavorite) {
            await removeFavoriteStation(station.id);
          } else {
            await addFavoriteStation(station.id);
          }
        } catch (error) {
          console.error("Error handling favorite:", error);
          showSnackbar(`Error ${isFavorite ? "removing" : "adding"} favorite`);
        }
      },
    };
  };

  const menuConfigs = {
    favorite: {
      ...getFavoriteMenuItem(),
    },
    map: {
      title: "Show on map",
      icon: "map-marker-radius-outline",
      onPress: () =>
        showOnMap(station?.longitude, station?.latitude, station?.id),
    },
    address: {
      title: "Copy address",
      icon: "content-copy",
      onPress: () => copyToClipboard(getFormattedAddress(station)),
    },
    share: {
      title: "Share",
      icon: "share-variant",
      onPress: () => share("Check out this station!"),
    },
    report: {
      title: "Report",
      icon: "alert-circle-outline",
      onPress: () => openEmail(contactEmail),
    },
  };

  return menuTypes
    .filter((type) => menuConfigs[type]) // Filter the visible menu items
    .map((type) => menuConfigs[type]);
};
