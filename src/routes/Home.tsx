import styled from "styled-components";
import _일년사서함Svg from "../assets/1년사서함.svg?react";
import { API_BASE_URL, COLOR_SET } from "../constants";
import { KakaLoginButton } from "../components/Login/KakaoLoginButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const 일년사서함Svg = styled(_일년사서함Svg)`
  width: 268px;
  height: 150px;
  margin-bottom: 24px;
`;

const Container = styled.div`
  margin-inline: auto;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-inline: 24px;
`;

const ByLettersToText = styled.span`
  font-family: Galmuri11;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: ${COLOR_SET.PRIMARY};
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
  @media (max-width: 700px) {
    flex: 1;
    justify-content: center;
  }
`;

const TermText = styled.span`
  font-family: Galmuri11;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  color: ${COLOR_SET.PRIMARY};
  white-space: pre-line;
  margin-bottom: 24px;
`;

export default function Home() {
  const navigate = useNavigate();

  function navigateToUser() {
    fetch(`${API_BASE_URL}/api/season-greeting/v1/my-profile`, {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    }).then(async (response) => {
      const data = await response.json();
      if (data.memberId) navigate(`/${data.memberId}`);
    });
  }

  useEffect(() => {
    navigateToUser();
  }, []);

  return (
    <Container>
      <TopWrapper>
        <일년사서함Svg />
        <ByLettersToText>by Letters to . . .</ByLettersToText>
      </TopWrapper>
      <KakaLoginButton />
      <TermText>
        {
          "회원가입 시 개인정보처리방침을 읽었으며\n 이용약관에 동의하신 것으로 간주합니다."
        }
      </TermText>
    </Container>
  );
}
