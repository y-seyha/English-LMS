import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/client";

export interface AdminStatus {
  isAdmin: boolean;
  isLoading: boolean;
}

export function useIsAdmin(): AdminStatus {
  const { user, isLoaded: userLoaded } = useUser();

  const metaRole =
    (user?.publicMetadata as Record<string, unknown> | undefined)?.role === "admin";

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: () => apiClient.get("/users/me").then(r => r.data),
    enabled: !!user,
    retry: false,
    staleTime: 5 * 60_000,
  });

  return {
    isAdmin: metaRole || data?.role === "admin",
    isLoading: !userLoaded || (!!user && isLoading),
  };
}
