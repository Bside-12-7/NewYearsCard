import styled from "styled-components";
import _FilledPostBoxSvg from "../../assets/post_box_with_letter.svg?react";
import { COLOR_SET } from "../../constants";
import { FilledLetterBoxResponse } from "../../models/letters/api";
import { useProfileQuery } from "../../models/auth/query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { LetterModal } from "./LetterModal";

const FilledPostBoxSvg = styled(_FilledPostBoxSvg)`
  width: 268px;
  height: 150px;
  @media (max-width: 700px) {
    width: 134px;
    height: 75px;
  }
`;

const PostBoxButton = styled.button<{ read?: "true" | "false" }>`
  position: relative;
  height: 150px;
  padding-block: 0;
  padding-inline: 0;
  border: none;
  background-color: unset;
  cursor: pointer;
  ${(props) =>
    props.read === "false"
      ? `
      &:after {
        content: "";
        position: absolute;
        top: 18px;
        right: 18px;
        height: 8px;
        width: 8px;
        border-radius: 50%;
        background-color: red;
        @media (max-width: 700px) {
          top: 9px;
          right: 9px;
          height: 4px;
          width: 4px;
        }
      }
    `
      : ""}
  @media (max-width: 700px) {
    height: 75px;
  }
`;

const PostBoxText = styled.span`
  font-family: Galmuri11;
  position: absolute;
  top: 41px;
  left: 0;
  right: 0;
  margin-inline: auto;
  width: fit-content;
  line-height: 29.33px;
  font-size: 22px;
  font-weight: 700;
  color: ${COLOR_SET.PRIMARY};
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 700px) {
    top: 20.5px;
    line-height: 15px;
    font-size: 11px;
    width: 60px;
  }
`;

export const FilledPostBox = ({ post }: { post: FilledLetterBoxResponse }) => {
  const { data: profileData } = useProfileQuery();
  const { identity } = useParams<{ identity: string }>();
  const [open, setOpen] = useState(false);

  const isMine = profileData?.identity === identity;

  return (
    <>
      <PostBoxButton
        read={post.read ? "true" : "false"}
        onClick={() => isMine && setOpen(true)}
      >
        <FilledPostBoxSvg />
        <PostBoxText>{post.fromName}</PostBoxText>
      </PostBoxButton>
      {open && (
        <LetterModal
          open={open}
          onClose={() => setOpen(false)}
          id={post.id}
        />
      )}
    </>
  );
};
