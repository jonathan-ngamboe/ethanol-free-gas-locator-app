import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { supabase } from "../../lib/supabase";
import { useSnackbar } from "./SnackbarContext";
import { useAuth } from "./AuthContext";
import { getStationDetails } from "../services/stationService";

const StationContext = createContext();

export const StationProvider = ({ children }) => {
  const [activeStation, setActiveStation] = useState(null);
  const [nearbyStations, setNearbyStations] = useState([]);
  const [favoriteStations, setFavoriteStations] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const { session } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false); // Used to know when we are fetching stations from the database
  const [pendingOperations, setPendingOperations] = useState(new Set()); // Used to track pending operations (add/remove favorite) for each station

  // Fetch favorite stations on mount and when session changes
  useEffect(() => {
    if (session?.user) {
      fetchFavoriteStations();
      fetchSearchHistory();
    }
  }, [session]);

  // Fetch favorite stations
  const fetchFavoriteStations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("favorite_stations")
        .select("id, station_id, created_at")
        .eq("profile_id", session?.user?.id);

      if (error) throw error;

      const stations = await Promise.all(
        data.map(async (favorite) => {
          const station = await getStationDetails(favorite.station_id);
          return {
            ...station,
            favorite_id: favorite.id,
            key: `fav-${favorite.id}-${Date.now()}`, // Clé unique avec timestamp
          };
        })
      );
      setFavoriteStations(stations);
    } catch (error) {
      console.error("Error fetching favorite stations:", error);
      showSnackbar("Error fetching favorite stations");
    } finally {
      setLoading(false);
    }
  };

  // Add favorite station
  const addFavoriteStation = useCallback(
    async (stationId) => {
      if (!stationId || pendingOperations.has(`add-${stationId}`)) {
        return;
      }

      setPendingOperations((prev) => new Set(prev).add(`add-${stationId}`));

      try {
        const { data, error } = await supabase
          .from("favorite_stations")
          .insert([
            {
              profile_id: session?.user?.id,
              station_id: stationId,
            },
          ])
          .select();

        if (error) throw error;

        const stationDetails = await getStationDetails(stationId);
        const newFavorite = {
          ...stationDetails,
          favorite_id: data[0].id,
          key: `fav-${data[0].id}-${Date.now()}`,
        };

        setFavoriteStations((prev) => {
          // Check if the station is not already in the favorites
          if (prev.some((station) => station.id === stationId)) {
            return prev;
          }
          return [...prev, newFavorite];
        });

        showSnackbar("Station added to favorites");
      } catch (error) {
        console.error("Error adding favorite:", error);
        showSnackbar("Error adding favorite");
      } finally {
        setPendingOperations((prev) => {
          const newSet = new Set(prev);
          newSet.delete(`add-${stationId}`);
          return newSet;
        });
      }
    },
    [session?.user?.id, pendingOperations, showSnackbar]
  );

  // Remove favorite station
  const removeFavoriteStation = useCallback(
    async (stationId) => {
      if (!stationId || pendingOperations.has(`remove-${stationId}`)) {
        return;
      }

      setPendingOperations((prev) => new Set(prev).add(`remove-${stationId}`));

      try {
        const { error } = await supabase
          .from("favorite_stations")
          .delete()
          .eq("profile_id", session?.user?.id)
          .eq("station_id", stationId);

        if (error) throw error;

        setFavoriteStations((prev) =>
          prev.filter((station) => station.id !== stationId)
        );

        showSnackbar("Station removed from favorites");
      } catch (error) {
        console.error("Error removing favorite:", error);
        showSnackbar("Error removing favorite");
      } finally {
        setPendingOperations((prev) => {
          const newSet = new Set(prev);
          newSet.delete(`remove-${stationId}`);
          return newSet;
        });
      }
    },
    [session?.user?.id, pendingOperations, showSnackbar]
  );

  // Add to search history by checking if the station is already in the history
  async function addToSearchHistory(station) {
    if (!session?.user?.id) {
      console.warn("No user session found when adding to search history");
      return;
    }

    // Check if the station is already in the search history
    const existingHistoryItem = searchHistory.find(
      (item) => item.id === station.id
    );

    // If the station is already in the history, update the timestamp
    if (existingHistoryItem) {
      try {
        const { error } = await supabase
          .from("search_history")
          .update({ searched_at: new Date() })
          .eq("id", existingHistoryItem.history_id);

        if (error) throw error;
        // Update the existing history item
        const updatedHistoryItem = {
          ...existingHistoryItem,
          searched_at: new Date().toISOString(),
        };
        setSearchHistory((prev) =>
          prev.map((item) =>
            item.history_id === existingHistoryItem.history_id
              ? updatedHistoryItem
              : item
          )
        );
      } catch (error) {
        console.error("Error updating search history item:", error);
        showSnackbar("Error updating search history item");
      }
    } else {
      try {
        const { error } = await supabase.from("search_history").insert([
          {
            profile_id: session?.user?.id,
            station_id: station.id,
          },
        ]);

        if (error) throw error;

        fetchSearchHistory();
      } catch (error) {
        showSnackbar("Error adding to search history", error.message);
      }
    }
  }

  // Fetch search history
  async function fetchSearchHistory() {
    if (!session?.user?.id) {
      console.warn("No user session found when fetching search history");
      return;
    }

    try {
      setLoading(true);

      // First, fetch the search history records
      const { data: historyData, error: historyError } = await supabase
        .from("search_history")
        .select(
          `
          id,
          station_id,
          searched_at
        `
        )
        .eq("profile_id", session.user.id)
        .order("searched_at", { ascending: false })
        .range(0, 9);

      if (historyError) throw historyError;

      // Fetch station details for each history item
      const searchHistoryWithDetails = await Promise.all(
        historyData.map(async (historyItem) => {
          try {
            const stationDetails = await getStationDetails(
              historyItem.station_id
            );
            return {
              ...stationDetails,
              history_id: historyItem.id,
              searched_at: new Date(historyItem.searched_at).toISOString(),
            };
          } catch (error) {
            console.error(
              `Error fetching details for station ${historyItem.station_id}:`,
              error
            );
            return null;
          }
        })
      );

      // Filter out any failed station detail fetches
      const validSearchHistory = searchHistoryWithDetails.filter(
        (item) => item !== null
      );

      setSearchHistory(validSearchHistory);
    } catch (error) {
      console.error("Error fetching search history:", error);
      showSnackbar("Error fetching search history");
    } finally {
      setLoading(false);
    }
  }

  async function removeFromSearchHistory(historyId) {
    if (!historyId) {
      console.error("Invalid history ID provided for removal");
      showSnackbar("Error removing search history item: Invalid ID");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from("search_history")
        .delete()
        .eq("id", historyId)
        .eq("profile_id", session?.user?.id);

      if (error) throw error;

      // Update local state
      setSearchHistory((prev) =>
        prev.filter((item) => item.history_id !== historyId)
      );

      showSnackbar("Search history item removed");
    } catch (error) {
      console.error("Error removing search history item:", error);
      showSnackbar("Error removing search history item");
    } finally {
      setLoading(false);
    }
  }

  async function clearSearchHistory() {
    if (!session?.user?.id) {
      console.warn("No user session found when clearing search history");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from("search_history")
        .delete()
        .eq("profile_id", session.user.id);

      if (error) throw error;

      setSearchHistory([]);
      showSnackbar("Search history cleared");
    } catch (error) {
      console.error("Error clearing search history:", error);
      showSnackbar("Error clearing search history");
    } finally {
      setLoading(false);
    }
  }

  return (
    <StationContext.Provider
      value={{
        loading,
        nearbyStations,
        setNearbyStations,
        favoriteStations,
        addFavoriteStation,
        removeFavoriteStation,
        searchHistory,
        clearSearchHistory,
        addToSearchHistory,
        activeStation,
        setActiveStation,
        pendingOperations,
      }}
    >
      {children}
    </StationContext.Provider>
  );
};

export const useStation = () => {
  const context = useContext(StationContext);
  if (!context) {
    throw new Error("useStation must be used within a StationProvider");
  }
  return context;
};
