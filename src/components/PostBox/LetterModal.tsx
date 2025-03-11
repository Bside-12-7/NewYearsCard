import { Modal, ModalClose } from "../common/Modal/Modal";
import styled from "styled-components";
import { COLOR_SET } from "../../constants";
import _질문바꾸기Svg from "../../assets/질문바꾸기.svg?react";
import { useLetterDetailQuery } from "../../models/letters/query";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import letterModalBg from "../../assets/letter_modal_bg.png";

const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 580px;
`;

const Container = styled.div`
  max-height: 90vh;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 48px 40px 40px;
  overflow: scroll;
  background-image: url(${letterModalBg}), linear-gradient(#FFCCEE, white 10%);
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

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const QuestionText = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 32px;
  color: ${COLOR_SET.PRIMARY};
`;

interface LetterEditModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

export const LetterModal = ({ open, onClose, id }: LetterEditModalProps) => {
  const { data } = useLetterDetailQuery(id);
  const queryClient = useQueryClient();
  const { identity } = useParams<{ identity: string }>();

  useEffect(() => {
    if (data)
      queryClient.invalidateQueries({ queryKey: ["LETTER_BOX", identity] });
  });

  if (!data) return;

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <Container>
          <ModalClose onClick={onClose} />
          <ToText>To. {data.toName}님</ToText>
          <QuestionWrapper>
            <QuestionText>{data.questionAnswers[0].question}</QuestionText>
          </QuestionWrapper>
          <div
            style={{
              fontSize: "15px",
              color: COLOR_SET.PRIMARY,
              marginBottom: "34px",
              lineHeight: "32px",
              height: "180px",
              maxHeight: "180px",
              overflow: "scroll",
            }}
          >
            {data.questionAnswers[0].answer}
          </div>

          <QuestionWrapper>
            <QuestionText>
              <QuestionText>{data.questionAnswers[1].question}</QuestionText>
            </QuestionText>
          </QuestionWrapper>
          <div
            style={{
              fontSize: "15px",
              color: COLOR_SET.PRIMARY,
              marginBottom: "34px",
              lineHeight: "32px",
              height: "180px",
              maxHeight: "180px",
              overflow: "scroll",
            }}
          >
            {data.questionAnswers[1].answer}
          </div>

          <div
            style={{
              textAlign: "right",
              fontWeight: 700,
              color: COLOR_SET.PRIMARY,
            }}
          >
            From. {data.fromName}님
          </div>
        </Container>
      </ModalContent>
    </Modal>
  );
};
