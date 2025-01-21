import { useMutation, useQuery } from "@tanstack/react-query";
import { getLetterBox, getLetterDetail } from "./api";
import { apiClient } from "../api-client";

export const useLetterBoxQuery = (identity?: string) => {
  return useQuery({
    queryKey: ["LETTER_BOX", identity],
    queryFn: () =>
      getLetterBox(identity ?? "").then((response) => response.data),
    enabled: !!identity,
  });
};

export const useSendLetterMutation = () => {
  return useMutation({
    mutationFn: (data: {
      memberId: number;
      slotIndex: number;
      questionAnswers: {
        question: string;
        answer: string;
      }[];
      fromName: string;
    }) => apiClient.post("/api/season-greeting/v1/letter", data),
  });
};

export const useLetterDetailQuery = (id: number) => {
  return useQuery({
    queryKey: ["LETTER_BOX", "DETAIL", id],
    queryFn: () => getLetterDetail(id).then((response) => response.data),
  });
};
