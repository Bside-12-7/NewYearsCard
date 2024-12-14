import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../constants";

export function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    const providerType = searchParams.get("providerType");
    if (!!code) {
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
      }).then(async (response) => {
        const data = await response.json();
        sessionStorage.setItem("accessToken", data.accessToken);
        fetch(`${API_BASE_URL}/api/season-greeting/v1/my-profile`, {
          headers: {
            authorization: `Bearer ${data.accessToken}`,
          },
        }).then(async (response) => {
          const data = await response.json();
          if (data.memberId) navigate(`/${data.memberId}`);
        });
      });
    }
  }, [searchParams]);

  return <></>;
}
