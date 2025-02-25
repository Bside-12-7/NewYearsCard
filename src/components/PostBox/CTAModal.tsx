import styled from "styled-components";
import { Modal, ModalClose } from "../common/Modal/Modal";
import { COLOR_SET } from "../../constants";
import letterModalBg from "../../assets/letter_modal_bg.png";
import { useProfileQuery } from "../../models/auth/query";
import CTAImage from "../../assets/CTA.png";
import { Button } from "@mui/base";

const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 580px;
  margin-inline: 20px;
`;

const Container = styled.div`
  max-height: 90vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 48px 40px 40px;
  overflow: scroll;
  background-image: url(${letterModalBg}), linear-gradient(#ffccee, white 10%);
  @media (max-width: 700px) {
    padding: 32px 20px 18px;
  }
`;

const ToText = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 32px;
  color: ${COLOR_SET.PRIMARY};
  margin-bottom: 8px;
`;

const FromText = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 32px;
  align-self: flex-end;
  color: ${COLOR_SET.PRIMARY};
`;

const CTAText = styled.div`
  font-wight: 400;
  font-size: 15px;
  line-height: 32px;
  color: ${COLOR_SET.PRIMARY};
  margin-bottom: 22px;
`;

const AppDownloadButton = styled(Button)`
  background: linear-gradient(#ff6ece 0%, #ff3dbd 100%);
  width: 100%;
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
  margin-bottom: 20px;
`;

interface LetterEditModalProps {
  open: boolean;
  onClose: () => void;
}

export const CTAModal = ({ open, onClose }: LetterEditModalProps) => {
  const { data: profileData } = useProfileQuery();

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
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <Container>
          <ModalClose onClick={onClose} />
          <ToText>To. {profileData?.name}님</ToText>
          <img
            src={CTAImage}
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          />
          <CTAText>
            유저 이름님, Letters to가 만든 1년 사서함에 오신 것을 환영해요!
            <br />
            1년 사서함 서비스가 재밌으셨다면, 분명 Letters to도 재밌어하실 텐데…
            Letters to는 ‘진짜 나와 너가 만나는 우편 사서함’ 서비스예요.
            <br />
            내가 하고 싶은 이야기를 꾹꾹 담아 귀여운 우표를 고른 뒤, 친구에게
            보낼 수 있어요.
            <br />
            익명의 친구들도 만날 수 있답니다. 앱스토어에서 다운 받아보세요!
            <br />
            *안드로이드는 아직 지원되지 않아요. 🥲 더 열심히 만들어볼게요!
          </CTAText>
          <AppDownloadButton onClick={handleInstallClick}>
            앱 다운로드하기
          </AppDownloadButton>
          <FromText>From. Team Letters to</FromText>
        </Container>
      </ModalContent>
    </Modal>
  );
};
