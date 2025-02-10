import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { COLOR_SET } from "../constants";
import { EmptyPostBox } from "../components/PostBox/EmptyPostBox";
import { FilledPostBox } from "../components/PostBox/FilledPostBox";
import 편지가_도착한_사서함을_클릭해_편지를_확인해보세요 from "../assets/편지가_도착한_사서함을_클릭해_편지를_확인해보세요.png";
import 사서함을_클릭해_편지를_확인해보세요 from "../assets/사서함을_클릭해_편지를_확인해보세요.png";
import { useLetterBoxQuery } from "../models/letters/query";
import { LetterBoxResponse } from "../models/letters/api";
import { useProfileQuery } from "../models/auth/query";
import { ShareButton } from "../components/Share/ShareButton";
import { HowToUseButton } from "../components/HowToUse/HowToUseButton";
import { Button } from "@mui/base";
import _RoundButtonSvg from "../assets/round_button_fill.svg?react";
import { CTAPostBox } from "../components/PostBox/CTAPostBox";
import { useMemo } from "react";

const Container = styled.div`
  margin-inline: auto;
  padding-block: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 700px) {
    padding-block: 60px;
  }
`;

const Title = styled.span`
  line-height: 64px;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 30px;
  color: ${COLOR_SET.PRIMARY};
  @media (max-width: 700px) {
    line-height: 27px;
    font-size: 20px;
    margin-bottom: 24px;
  }
`;

const LetterBoxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 536px;
  @media (max-width: 700px) {
    width: 268px;
  }
`;

const LetterCTA = styled.img<{ screen?: "desktop" | "mobile" }>`
  height: 69.5px;
  margin-bottom: 30px;
  @media (max-width: 700px) {
    height: 35px;
    margin-bottom: 12px;
  }
  display: ${(props) => (props.screen === "desktop" ? "block" : "none")};
  @media (max-width: 700px) {
    display: ${(props) => (props.screen === "desktop" ? "none" : "block")};
  }
`;

export default function LetterBox() {
  const { identity } = useParams();

  const { data: letterBoxData } = useLetterBoxQuery(identity);
  const { data: profileData } = useProfileQuery();

  const LetterBoxList = useMemo(() => {
    const letterBoxList = (
      letterBoxData?.seasonGreetingLetterResponses ?? new Array(25)
    ).map((letterResponse) => {
      if (typeof letterResponse.id === "number") {
        return <FilledPostBox key={letterResponse.id} post={letterResponse} />;
      } else {
        return (
          <EmptyPostBox
            key={letterResponse.slotIndex}
            slotIndex={letterResponse.slotIndex}
          />
        );
      }
    });

    return letterBoxList;
  }, [letterBoxData]);

  const navigate = useNavigate();

  if (!letterBoxData) return;

  return (
    <>
      <Container>
        <Title>{letterBoxData.memberName}의 사서함</Title>
        <LetterCTA
          screen="desktop"
          src={편지가_도착한_사서함을_클릭해_편지를_확인해보세요}
        />
        <LetterCTA screen="mobile" src={사서함을_클릭해_편지를_확인해보세요} />
        <LetterBoxWrapper>
          <CTAPostBox />
          {LetterBoxList}
        </LetterBoxWrapper>
      </Container>
      {profileData ? (
        <>
          <ShareButton />
        </>
      ) : (
        <>
          <HowToUseButton />
          <StyledButton onClick={() => navigate("/")}>
            <RoundButtonSvg />
            <ShareButtonText>{`나도\n편지받기`}</ShareButtonText>
          </StyledButton>
        </>
      )}
    </>
  );
}

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 60px;
  right: 60px;
  padding-block: 0;
  padding-inline: 0;
  border: none;
  background-color: unset;
  cursor: pointer;
  border-radius: 50%;
  @media (max-width: 700px) {
    bottom: 24px;
    right: 24px;
  }
`;

const ShareButtonText = styled.span`
  position: absolute;
  top: 23px;
  left: 0;
  right: 0;
  bottom: 0;
  margin-inline: auto;
  width: 100%;
  line-height: 24px;
  font-size: 18px;
  font-weight: 700;
  color: white;
  white-space: pre;
  @media (max-width: 700px) {
    top: 8px;
    line-height: 16px;
    font-size: 12px;
  }
`;

const RoundButtonSvg = styled(_RoundButtonSvg)`
  width: 94px;
  height: 94px;
  @media (max-width: 700px) {
    width: 47px;
    height: 47px;
  }
`;
