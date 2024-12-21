import { apiClient } from "../api-client"

export interface EmptyLetterBoxResponse {
    "id": null,
    "slotIndex": number,
    "fromName": null,
    "read": null
}

export interface FilledLetterBoxResponse {
    "id": number,
    "slotIndex": number,
    "fromName": string,
    "read": boolean
}

export interface LetterBoxResponse {
    identity: string;
    memberId: number;
    memberName: string;
    seasonGreetingLetterResponses: (FilledLetterBoxResponse | EmptyLetterBoxResponse)[]
}

export const getLetterBox = async (identity: string) => {
    return apiClient.get<LetterBoxResponse>(`/api/season-greeting/v1/main/${identity}`)
}