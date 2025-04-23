import api from "@/lib/base-url";
import { useCallback, useState } from "react";

export const useFetchSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchSearchQuery = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.post(`/search-videos?query=${searchQuery}`);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err as string);
      setLoading(false);
    }
  }, [searchQuery]);

  return { searchQuery, setSearchQuery, fetchSearchQuery, error, loading };
};
