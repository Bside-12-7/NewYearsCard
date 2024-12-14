import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../constants";

export function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function getToken() {
    const code = searchParams.get("code");
    const providerType = searchParams.get("providerType");
    if (!!code && !!providerType) {
      fetch(`${API_BASE_URL}/api/season-greeting/v1/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          providerType,
          code,
          redirectUri: "http://localhost:5173/auth",
        }),
      })
        .then(async (response) => {
          const data = await response.json();
          sessionStorage.setItem("accessToken", data.accessToken);
          navigateToUser(data.accessToken);
        })
        .catch(() => navigate("/"));
    } else {
      navigate("/");
    }
  }

  function navigateToUser(accessToken: string) {
    fetch(`${API_BASE_URL}/api/season-greeting/v1/my-profile`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();
        if (data.memberId) navigate(`/${data.memberId}`);
      })
      .catch(() => navigate("/"));
  }

  useEffect(() => {
    getToken();
  }, [searchParams]);

  return <></>;
}
