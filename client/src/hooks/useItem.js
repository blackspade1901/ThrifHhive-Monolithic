import { useEffect, useState } from "react";
import { itemsApi } from "../api/items.js";

export function useItem(id) {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setError(null);

    itemsApi
      .getById(id)
      .then((data) => {
        if (!isCancelled) setItem(data);
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
  }, [id]);

  return { item, isLoading, error };
}
