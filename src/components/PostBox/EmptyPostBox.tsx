import styled from "styled-components";
import _EmptyPostBoxSvg from "../../assets/empty_post_box.svg?react";

const EmptyPostBoxSvg = styled(_EmptyPostBoxSvg)`
  width: 268px;
  height: 150px;
  @media (max-width: 600px) {
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
  @media (max-width: 600px) {
    height: 75px;
  }
`;

export const EmptyPostBox = () => {
  return (
    <PostBoxButton>
      <EmptyPostBoxSvg />
    </PostBoxButton>
  );
};
