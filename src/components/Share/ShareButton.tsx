
import { Button, Modal as BaseModal } from "@mui/base";
import _RoundButtonSvg from "../../assets/round_button.svg?react";
import styled from "styled-components";
import { COLOR_SET } from "../../constants";
import { useMediaQuery } from "usehooks-ts";
import { useState } from "react";
import React from "react";
import clsx from "clsx";
import XMarkSvg from "../../assets/x_mark.svg?react";

const _ShareButton = styled(Button)`
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
  bottom: 0
  margin-inline: auto;
  width: 100%;
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

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: ${COLOR_SET.PRIMARY};
  opacity: 0.7;
  -webkit-tap-highlight-color: transparent;
`;

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  position: relative;
  border: 1px solid ${COLOR_SET.PRIMARY};
  border-radius: 10px;
  background-color: white;
  width: 100%;
  max-width: 327px;
`

const StyledModalHeader = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 24.75px;
  color: ${COLOR_SET.PRIMARY};
  text-align: center;
  padding-block: 13.5px;
`

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
`

const URLBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 6px 6px 6px 11px;
  border: 1px solid ${COLOR_SET.PRIMARY};
  border-radius: 5px;
`

const URLText = styled.span`
  max-width: calc(100% - 48px);
  overflow: hidden;
  text-overflow: ellipsis;
`

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
`

const ModalCloseButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`

function ModalHeader(props: { children: React.ReactNode, onClose: () => void }) {
  return (
    <StyledModalHeader>
      <ModalCloseButton onClick={props.onClose}><XMarkSvg /></ModalCloseButton>
      {props.children}
    </StyledModalHeader>
  )
}

export function ShareButton() {
  const mobile = useMediaQuery("(max-width: 700px)");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function copyURL() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <_ShareButton onClick={() => setOpen(true)}>
        <RoundButtonSvg />
        <ShareButtonText>{mobile ? `공유\n하기` : `친구에게\n공유하기`}</ShareButtonText>
      </_ShareButton>
      <Modal open={open} onClose={() => setOpen(false)}
        slots={{ backdrop: StyledBackdrop }}>
        <ModalContent>
          <ModalHeader onClose={() => setOpen(false)}>공유하기</ModalHeader>
          <ModalBody>{`친구들에게 공유하고\n비어있는 사서함을 채워보세요`}
            <URLBox>
              <URLText>{window.location.href}</URLText>
              <URLCopyButton onClick={copyURL}>복사</URLCopyButton>
            </URLBox>
          </ModalBody>
          {copied && <CopyToast>복사 완료!</CopyToast>}
        </ModalContent>
      </Modal>
    </>
  );
}