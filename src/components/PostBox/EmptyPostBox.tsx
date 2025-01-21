import styled from "styled-components";
import _EmptyPostBoxSvg from "../../assets/empty_post_box.svg?react";
import { useState } from "react";
import _질문바꾸기Svg from "../../assets/질문바꾸기.svg?react";
import { LetterEditModal } from "./LetterEditModal";

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
  const [open, setOpen] = useState(false);

  return (
    <>
      <PostBoxButton onClick={() => setOpen(true)}>
        <EmptyPostBoxSvg />
      </PostBoxButton>
      {open && (
        <LetterEditModal
          key={String(open)}
          open={open}
          onClose={() => setOpen(false)}
          slotIndex={slotIndex}
        />
      )}
    </>
  );
};
