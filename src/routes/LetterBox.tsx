import { useParams } from "react-router-dom";
import styled from "styled-components";
import { COLOR_SET } from "../constants";
import EmptyPostBoxSvg from "../assets/empty_post_box.svg?react";

const Container = styled.div`
  width: 536px;
  margin-inline: auto;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
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
`

export default function LetterBox() {
  const { id } = useParams();
  return (
    <Container>
      <Title>홈길동의 사서함</Title>
      <LetterBoxWrapper>
        <EmptyPostBox />
        <EmptyPostBox />
        <EmptyPostBox />
        <EmptyPostBox />
        <EmptyPostBox />
        <EmptyPostBox />
        <EmptyPostBox />
        <EmptyPostBox />
        <EmptyPostBox />
        <EmptyPostBox />
        <EmptyPostBox />
        <EmptyPostBox />
        <EmptyPostBox />
        <EmptyPostBox />
        <EmptyPostBox />
      </LetterBoxWrapper>
    </Container>
  );
}
