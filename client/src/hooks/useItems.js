import { useEffect, useState } from "react";
import { itemsApi } from "../api/items.js";

/**
 * Encapsulates fetching + loading/error state for the item list so
 * BrowsePage stays a thin presentational component.
 */
export function useItems(filters) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setError(null);

    itemsApi
      .list(filters)
      .then((data) => {
        if (!isCancelled) setItems(data);
      })
      .catch((err) => {
        if (!isCancelled) setError(err.message);
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category, filters.search, filters.sort]);

  return { items, isLoading, error };
}
