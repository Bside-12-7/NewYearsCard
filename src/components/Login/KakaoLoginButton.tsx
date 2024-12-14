import styled from "styled-components";
import kakaoLogo from "../../assets/logo/kakao.png";
import { API_BASE_URL } from "../../constants";

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
  const redirectUri = "http://localhost:5173/auth";
  const kakaoLoginURL = `${API_BASE_URL}/api/season-greeting/v1/kakao?redirectUri=${redirectUri}`;

  async function handleClickKakaoLogin() {
    window.location.href = kakaoLoginURL;
  }

  return (
    <_KakaLoginButton onClick={handleClickKakaoLogin}>
      <KakaoLoginLogo src={kakaoLogo} />
      <KakaoLoginText>카카오톡으로 시작하기</KakaoLoginText>
    </_KakaLoginButton>
  );
};
