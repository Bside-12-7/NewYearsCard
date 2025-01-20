import styled from "styled-components";
import _EmptyPostBoxSvg from "../../assets/empty_post_box.svg?react";
import { EmptyLetterBoxResponse } from "../../models/letters/api";
import { useState } from "react";
import { Modal } from "../common/Modal/Modal";
import { COLOR_SET } from "../../constants";
import { useLetterBoxQuery } from "../../models/letters/query";
import { useParams } from "react-router-dom";
import _질문바꾸기Svg from "../../assets/질문바꾸기.svg?react";
import { Input, TextareaAutosize } from "@mui/base";

const EmptyPostBoxSvg = styled(_EmptyPostBoxSvg)`
  width: 268px;
  height: 150px;
  @media (max-width: 700px) {
    width: 134px;
    height: 75px;
  }
`;

const 질문바꾸기Svg = styled(_질문바꾸기Svg)`
  width: 111px;
  height: 22px;
`

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

const ModalContent = styled.div`
  position: relative;
  border: 1px solid ${COLOR_SET.PRIMARY};
  background-color: white;
  width: 100%;
  max-width: 580px;
  padding: 48px 40px 40px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ToText = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 32px;
  color: ${COLOR_SET.PRIMARY};
  margin-bottom: 8px;
`

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const QuestionText = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 32px;
  color: ${COLOR_SET.PRIMARY};
`

const _QuestionChangeButton = styled.button`
  width: min-content;
  height: min-content;
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
`;

const AnswerTextarea = styled(TextareaAutosize)`
  border: none;
  background: unset;
  font-family: Galmuri11;
  font-weight: 400;
  font-size: 15px;
  line-height: 40px;
  resize: none;
  // min-height: 160px;
  // max-height: 160px;
  margin-bottom: 22px;
`;

const FromInput = styled(Input)`
  font-weight: 700;
  font-size: 15px;
  line-height: 32px;
  color: #0000CC4D;
  margin-left: auto;
  input {
    font-family: Galmuri11;
    border: none;
    font-weight: 700;
    font-size: 15px;
    line-height: 32px;
    width: 145px;
    color: ${COLOR_SET.PRIMARY};
  }
  input::placeholder {
    color: #0000CC4D;
  }
`

const QuestionChangeButton = () => {
  return <_QuestionChangeButton><질문바꾸기Svg /></_QuestionChangeButton>
}

export const EmptyPostBox = ({ post }: { post: EmptyLetterBoxResponse }) => {
  const [open, setOpen] = useState(false);
  const { identity } = useParams();
  const { data: letterBoxData } = useLetterBoxQuery(identity);

  return (
    <>
      <PostBoxButton onClick={() => setOpen(true)}>
        <EmptyPostBoxSvg />
      </PostBoxButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalContent>
          <Container>
            <ToText>To. {letterBoxData?.memberName}님</ToText>
            <QuestionWrapper>
              <QuestionText>2024, 홍길동님과 가장 기억에 남는 순간은?</QuestionText>
              <QuestionChangeButton />
            </QuestionWrapper>
            <AnswerTextarea placeholder="내용을 입력해주세요" minRows={4} maxRows={4} />
            <QuestionWrapper>
              <QuestionText>2024, 홍길동님과 가장 기억에 남는 순간은?</QuestionText>
              <QuestionChangeButton />
            </QuestionWrapper>
            <AnswerTextarea placeholder="내용을 입력해주세요" minRows={4} maxRows={4} />
            <FromInput startAdornment="From." placeholder="이름을 입력해주세요" />
          </Container>
        </ModalContent>
      </Modal>
    </>
  );
};
