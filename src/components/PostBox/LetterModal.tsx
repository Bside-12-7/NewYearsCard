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
  padding: 16px;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid ${COLOR_SET.PRIMARY};
  background-color: white;
  margin-bottom: 16px;
  padding: 48px 40px 40px;
  overflow: scroll;
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
  const { identity } = useParams();

  useEffect(() => {
    if (data)
      queryClient.invalidateQueries({ queryKey: ["LETTER_BOX", identity] });
  });

  if (!data) return;

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <Container
          style={{
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            backgroundImage: `url(${letterModalBg}), linear-gradient(#FFCCEE, white 10%)`,
          }}
        >
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

/**
 *{
    "id": 6,
    "questionAnswers": [
        {
            "question": "올해 우리가 먹은 음식 중 가장 맛있었던 음식은?",
            "answer": ""
        },
        {
            "question": "올해 나에게 못다한 말이 있다면?",
            "answer": ""
        }
    ],
    "fromName": "",
    "toName": "진석"
}
 */
