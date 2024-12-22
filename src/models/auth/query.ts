import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile, getToken } from "./api";

export function useTokenMutation() {
  return useMutation({
    mutationFn: getToken,
  });
}

export function useProfileQuery() {
  return useQuery({
    queryKey: ["PROFILE"],
    queryFn: () => getProfile().then((response) => response.data),
  });
}