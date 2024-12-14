import { apiClient } from "../api-client";

export function getToken(body: { code: string; providerType: string }) {
  return apiClient.post<{ accessToken: string }>(
    "/api/season-greeting/v1/token",
    { ...body, redirectUri: "http://localhost:5173/auth" },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export function getProfile() {
  return apiClient.get<{
    identity: string;
    id: number;
    name: string;
  }>("/api/season-greeting/v1/my-profile");
}
