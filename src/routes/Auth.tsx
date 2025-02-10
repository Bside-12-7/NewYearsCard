import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTokenMutation } from "../models/auth/query";
import { getProfile } from "../models/auth/api";
import { useQueryClient } from "@tanstack/react-query";

export function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useTokenMutation();

  function auth() {
    const code = searchParams.get("code");
    const providerType = searchParams.get("providerType");
    if (!!code && !!providerType) {
      mutate(
        { code, providerType },
        {
          onSuccess(response) {
            sessionStorage.setItem("accessToken", response.data.accessToken);
            navigateToUser();
          },
          onError() {
            navigate("/");
          },
        }
      );
    } else {
      navigate("/");
    }
  }

  async function navigateToUser() {
    const response = await queryClient.fetchQuery({
      queryKey: ["PROFILE"],
      queryFn: getProfile,
    });
    if (response.data) {
      navigate(`/${response.data.identity}`);
    }
  }

  useEffect(() => {
    auth();
  }, [searchParams]);

  return <></>;
}
