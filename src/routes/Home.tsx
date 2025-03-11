import styled from "styled-components";
import _일년사서함Svg from "../assets/1년사서함.svg?react";
import { COLOR_SET } from "../constants";
import { KakaLoginButton } from "../components/Login/KakaoLoginButton";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useProfileQuery } from "../models/auth/query";

const 일년사서함Svg = styled(_일년사서함Svg)`
  width: 268px;
  height: 150px;
  margin-bottom: 24px;
`;

const Container = styled.div`
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 184px;
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
  margin-bottom: 160px;
`;

const TermText = styled.span`
  font-family: Galmuri11;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  color: ${COLOR_SET.PRIMARY};
  white-space: pre-line;
  margin-bottom: 24px;
`;

export default function Home() {
  const history = useHistory();

  const { data } = useProfileQuery();

  function navigateToUser() {
    if (data) {
      history.push(`/letter#/${data.identity}`);
    } else {
      sessionStorage.removeItem("accessToken");
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) navigateToUser();
  }, []);

  return (
    <Container>
      <TopWrapper>
        <일년사서함Svg />
        <ByLettersToText>by Letters to . . .</ByLettersToText>
      </TopWrapper>
      <KakaLoginButton />
      <TermText>
        회원가입 시{" "}
        <a
          href="https://alert-athlete-d7c.notion.site/00de9a73e19a4e119e09312c1e6577a9"
          target="_blank"
        >
          개인정보처리방침
        </a>
        을 읽었으며{"\n"}{" "}
        <a
          href="https://alert-athlete-d7c.notion.site/36b5d2ff6eb74d9490c178a6d9faf6d3"
          target="_blank"
        >
          이용약관
        </a>
        에 동의하신 것으로 간주합니다.
      </TermText>
    </Container>
  );
}
