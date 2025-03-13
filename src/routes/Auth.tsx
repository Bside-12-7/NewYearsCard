import { useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTokenMutation } from "../models/auth/query";
import { getProfile } from "../models/auth/api";
import { useQueryClient } from "@tanstack/react-query";

export function Auth() {
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const history = useHistory();
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
            history.push("/home");
          },
        }
      );
    } else {
      history.push("/home");
    }
  }

  async function navigateToUser() {
    const response = await queryClient.fetchQuery({
      queryKey: ["PROFILE"],
      queryFn: getProfile,
    });
    if (response.data) {
      history.push(`/${response.data.identity}`);
    }
  }

  useEffect(() => {
    auth();
  }, [searchParams]);

  return <></>;
}
