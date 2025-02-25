import styled from "styled-components";
import _EmptyPostBoxSvg from "../../assets/empty_post_box.svg?react";
import { useState } from "react";
import _질문바꾸기Svg from "../../assets/질문바꾸기.svg?react";
import { LetterEditModal } from "./LetterEditModal";
import { useProfileQuery } from "../../models/auth/query";
import { useParams } from "react-router-dom";
import { Button } from "@mui/base";
import { COLOR_SET } from "../../constants";
import XMarkSvg from "../../assets/x_mark.svg?react";
import { Modal } from "../common/Modal/Modal";
import { useQueryClient } from "@tanstack/react-query";

const EmptyPostBoxSvg = styled(_EmptyPostBoxSvg)`
  width: 268px;
  height: 150px;
  @media (max-width: 700px) {
    width: 134px;
    height: 75px;
  }
`;

const PostBoxButton = styled.button`
  position: relative;
  height: 150px;
  padding-block: 0;
  padding-inline: 0;
  border: none;
  background-color: unset;
  cursor: pointer;
  @media (max-width: 700px) {
    height: 75px;
  }
`;

export const EmptyPostBox = ({ slotIndex }: { slotIndex: number }) => {
  const queryClient = useQueryClient();
  const { data: profileData } = useProfileQuery();
  const { identity } = useParams();
  const [open, setOpen] = useState(false);

  const isMine = profileData?.identity === identity;

  return (
    <>
      <PostBoxButton onClick={() => setOpen(true)}>
        <EmptyPostBoxSvg />
      </PostBoxButton>
      {open &&
        (isMine ? (
          <ShareModal open={open} onClose={() => setOpen(false)} />
        ) : (
          <LetterEditModal
            key={String(open)}
            open={open}
            onClose={() => {
              setOpen(false);
              queryClient.invalidateQueries({ queryKey: ["LETTER_BOX"] });
            }}
            slotIndex={slotIndex}
          />
        ))}
    </>
  );
};

const ShareModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  function copyURL() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <ModalHeader onClose={onClose}>공유하기</ModalHeader>
        <ModalBody>
          {`친구들에게 공유하고\n비어있는 사서함을 채워보세요`}
          <URLBox>
            <URLText>{window.location.href}</URLText>
            <URLCopyButton onClick={copyURL}>복사</URLCopyButton>
          </URLBox>
        </ModalBody>
        {copied && <CopyToast>복사 완료!</CopyToast>}
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  position: relative;
  border-radius: 10px;
  background-color: white;
  width: 100%;
  max-width: 327px;
`;
const StyledModalHeader = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 24.75px;
  color: ${COLOR_SET.PRIMARY};
  text-align: center;
  padding-block: 13.5px;
`;
const ModalCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: ${COLOR_SET.PRIMARY};
  text-align: center;
  white-space: pre;
`;
const URLBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 6px 6px 6px 11px;
  border: 1px solid ${COLOR_SET.PRIMARY};
  border-radius: 5px;
`;
const URLText = styled.span`
  max-width: calc(100% - 48px);
  overflow: hidden;
  text-overflow: ellipsis;
`;
const URLCopyButton = styled(Button)`
  background-color: ${COLOR_SET.PRIMARY};
  color: white;
  border: none;
  border-radius: 10px;
  padding: 6px 8px;
  cursor: pointer;
`;

const CopyToast = styled.div`
  position: absolute;
  bottom: -56px;
  left: 0;
  right: 0;
  width: fit-content;
  margin-inline: auto;
  padding: 8px 12px;
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 10px;
  font-size: 13px;
  line-height: 16px;
`;
function ModalHeader(props: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <StyledModalHeader>
      <ModalCloseButton onClick={props.onClose}>
        <XMarkSvg />
      </ModalCloseButton>
      {props.children}
    </StyledModalHeader>
  );
}
