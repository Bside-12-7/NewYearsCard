import styled from "styled-components";
import { Modal as BaseModal, ModalProps } from "@mui/base";
import React from "react";
import { COLOR_SET } from "../../../constants";
import clsx from "clsx";

const StyledModal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const Modal = (props: ModalProps) => {
  return (
    <StyledModal
      open={props.open}
      onClose={props.onClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      {props.children}
    </StyledModal>
  );
}