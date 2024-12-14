import styled from "styled-components";
import kakaoLogo from "../../assets/logo/kakao.png";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const _KakaLoginButton = styled.button`
  width: 100%;
  max-width: 327px;
  height: 52px;
  padding-block: 16px;
  padding-inline: 0;
  border: none;
  background-color: #f9e54c;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const KakaoLoginLogo = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const KakaoLoginText = styled.span`
  font-family: Galmuri11;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
`;

export const KakaLoginButton = () => {
  const rest_api_key = "40e0711437cf1f9245ba66e43cb9a042";
  const redirect_uri = "http://localhost:5173";
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  async function handleClickKakaoLogin() {
    // const { code } = await fetch(
    //   "http://15.165.100.80/api/season-greeting/v1/kakao"
    // ).then((response) => response.json());
    // console.log(code)

    // const d = await fetch("http://15.165.100.80/api/season-greeting/v1/token", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     providerType: "KAKAO",
    //     code: "string",
    //   }),
    // });

    window.location.href = kakaoUrl;
  }

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!!code) {
      fetch("http://15.165.100.80/api/season-greeting/v1/token", {
        method: "POST",
        body: JSON.stringify({
          providerType: "KAKAO",
          code: code,
        }),
      }).then((response) => {
        console.log(response.json());
      });
    }
  }, [searchParams]);

  return (
    <_KakaLoginButton onClick={handleClickKakaoLogin}>
      <KakaoLoginLogo src={kakaoLogo} />
      <KakaoLoginText>카카오톡으로 시작하기</KakaoLoginText>
    </_KakaLoginButton>
  );
};
