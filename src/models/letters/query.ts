import { useQuery } from "@tanstack/react-query";
import { getLetterBox } from "./api";

export const useLetterBoxQuery = (identity?: string) => {
    return useQuery({
        queryKey: ["LETTER_BOX", identity],
        queryFn: () => getLetterBox(identity ?? "").then((response) => response.data),
        enabled: !!identity,
    });
}