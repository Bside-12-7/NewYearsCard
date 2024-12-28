import _RoundButtonSvg from "../../assets/round_button.svg?react";
import styled from "styled-components";
import { Button } from "@mui/base";
import { COLOR_SET } from "../../constants";
import { useState } from "react";
import { Modal } from "../common/Modal/Modal";
import XMarkSvg from "../../assets/x_mark.svg?react";
import Step1Image from "../../assets/howToUse/1.png";
import Step2Image from "../../assets/howToUse/2.png";
import Step3Image from "../../assets/howToUse/3.png";

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
`

const RoundButtonSvg = styled(_RoundButtonSvg)`
  width: 94px;
  height: 94px;
  @media (max-width: 700px) {
    width: 47px;
    height: 47px;
  }
`

const ShareButtonText = styled.span`
  position: absolute;
  top: 27px;
  left: 0;
  right: 0;
  bottom: 0;
  margin-inline: auto;
  width: 100%;
  font-family: Galmuri11;
  line-height: 24px;
  font-size: 18px;
  font-weight: 700;
  color: ${COLOR_SET.PRIMARY};
  white-space: pre;
  @media (max-width: 700px) {
    top: 8px;
    line-height: 16px;
    font-size: 12px;
  }
`;

const ModalContent = styled.div`
  position: relative;
  background-color: white;
  width: 100%;
  max-width: 878px;
  @media (max-width: 700px) {
    width: fit-content;
  }
`

const ModalCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 46px 132px;
  align-items: center;
  @media (max-width: 700px) {
    height: 460px;
    overflow-y: scroll;
    padding: 40px 46px;
  }
`

const ModalTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  line-height: 42px;
  color: white;
  color: ${COLOR_SET.PRIMARY};
  margin-bottom: 20px;
`;

const ModalDescription = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: calc(100% / 3);
  @media (max-width: 700px) {
    width: 250px;
    max-width: unset;
  }
`;

const DescriptionImage = styled.img`
  width: 100%;
`;

const DescriptionText = styled.div`
  font-size: 15px;
  font-weight: 400;
  line-height: 22.5px;
  color: ${COLOR_SET.PRIMARY};
  white-space: pre-line;
  text-align: center;
`;

const InstallButton = styled(Button)`
  position: absolute;
  bottom: 40px;
  left: 46px;
  background: linear-gradient( #FF6ECE 0%, #FF3DBD 100%);
  width: calc(100% - 92px);
  padding: 16px;
  margin-inline: auto;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  font-family: Galmuri11;
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  @media (max-width: 700px) {
    bottom: -68px;
    left: 0;
    width: 100%;
  }
`

export const HowToUseButton = () => {
  const [open, setOpen] = useState(false);

  function handleInstallClick() {
    const userAgent = navigator.userAgent.toLowerCase();

    if (
      userAgent.indexOf("iphone") > -1 ||
      userAgent.indexOf("ipad") > -1 ||
      userAgent.indexOf("ipod") > -1
    ) {
      window.open("https://apps.apple.com/kr/app/letters-to/id6444780538");
    }
  }

  return (
    <>
      <StyledButton onClick={() => setOpen(true)}>
        <RoundButtonSvg />
        <ShareButtonText>{`이용\n방법`}</ShareButtonText>
      </StyledButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalContent>
          <ModalCloseButton onClick={() => setOpen(false)}><XMarkSvg /></ModalCloseButton>
          <ModalBody>
            <ModalTitle>이용방법</ModalTitle>
            <ModalDescription>
              <DescriptionWrapper>
                <DescriptionImage src={Step1Image} />
                <DescriptionText>{"빈 사서함을 클릭해\n편지를 작성해주세요"}</DescriptionText>
              </DescriptionWrapper>
              <DescriptionWrapper>
                <DescriptionImage src={Step2Image} />
                <DescriptionText>{"원하는 질문을 골라서\n편지를 쓸 수 있어요!"}</DescriptionText>
              </DescriptionWrapper>
              <DescriptionWrapper>
                <DescriptionImage src={Step3Image} />
                <DescriptionText>{"Letters to 앱 다운받고\n더 많은 사람들과 이야기 나눠봐요!"}</DescriptionText>
              </DescriptionWrapper>
            </ModalDescription>
          </ModalBody>
          <InstallButton onClick={handleInstallClick}>Letters to 앱 설치하러 가기</InstallButton>
        </ModalContent>
      </Modal>
    </>
  )
}