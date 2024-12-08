import { useParams } from "react-router-dom";
import styled from "styled-components";
import { COLOR_SET } from "../constants";
import EmptyPostBoxSvg from "../assets/empty_post_box.svg?react";
import FilledPostBoxSvg from "../assets/post_box_with_letter.svg?react";

const Container = styled.div`
  width: 536px;
  margin-inline: auto;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.span`
  line-height: 64px;
  font-size: 48px;
  font-weight: 700;
  color: ${COLOR_SET.PRIMARY};
`;

const LetterBoxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const EmptyPostBox = styled(EmptyPostBoxSvg)`
  width: 268px;
  height: 150px;
`;

const FilledPostBox = styled(FilledPostBoxSvg)`
  width: 268px;
  height: 150px;
`;

const PostBoxButton = styled.button<{ read?: boolean }>`
  position: relative;
  height: 150px;
  padding-block: 0;
  padding-inline: 0;
  border: none;
  background-color: unset;
  cursor: pointer;
  ${(props) =>
    props.read === false
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
      }
    `
      : ""}
`;

const PostBoxText = styled.span`
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
`;

export default function LetterBox() {
  const { id } = useParams();

  const data = {
    memberId: id,
    memberName: "string",
    seasonGreetingLetterResponses: [
      {
        id: 0,
        slotIndex: 0,
        fromName: "string",
        read: true,
      },
      {
        id: 1,
        slotIndex: 3,
        fromName: "string",
        read: false,
      },
    ],
  };

  const generatePostBoxList = () => {
    const postBoxList = new Array(20).fill(
      <PostBoxButton>
        <EmptyPostBox />
      </PostBoxButton>
    );

    data.seasonGreetingLetterResponses.forEach((post) => {
      postBoxList[post.slotIndex] = (
        <PostBoxButton read={post.read}>
          <FilledPostBox />
          <PostBoxText>{post.fromName}</PostBoxText>
        </PostBoxButton>
      );
    });

    return postBoxList;
  };

  return (
    <Container>
      <Title>{data.memberName}의 사서함</Title>
      <LetterBoxWrapper>
        {generatePostBoxList()}
      </LetterBoxWrapper>
    </Container>
  );
}
