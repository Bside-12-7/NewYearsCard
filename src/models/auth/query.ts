import { useMutation } from "@tanstack/react-query";
import { getToken } from "./api";

export function useTokenMutation() {
  return useMutation({
    mutationFn: getToken,
  });
}
