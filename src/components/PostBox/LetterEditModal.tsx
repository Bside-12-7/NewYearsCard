import { Button, ButtonProps, Input, TextareaAutosize } from "@mui/base";
import { Modal, ModalClose } from "../common/Modal/Modal";
import styled from "styled-components";
import { COLOR_SET, QUESTION_LIST } from "../../constants";
import _질문바꾸기Svg from "../../assets/질문바꾸기.svg?react";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useLetterBoxQuery,
  useSendLetterMutation,
} from "../../models/letters/query";
import { MouseEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

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
  margin-bottom: 22px;
`;

const FromInput = styled(Input)`
  font-weight: 700;
  font-size: 15px;
  line-height: 32px;
  color: #0000cc4d;
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
    color: #0000cc4d;
  }
`;

const 질문바꾸기Svg = styled(_질문바꾸기Svg)`
  width: 111px;
  height: 22px;
`;

const LetterSubmitButton = styled(Button)`
  background: linear-gradient(#ff6ece 0%, #ff3dbd 100%);
  width: 100%;
  padding: 16px;
  margin-inline: auto;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  font-family: Galmuri11;
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
`;

const QuestionChangeButton = (props: ButtonProps) => {
  return (
    <_QuestionChangeButton {...props}>
      <질문바꾸기Svg />
    </_QuestionChangeButton>
  );
};

interface LetterEditModalProps {
  open: boolean;
  onClose: () => void;
  slotIndex: number;
}

export const LetterEditModal = ({
  open,
  onClose,
  slotIndex,
}: LetterEditModalProps) => {
  const queryClient = useQueryClient();
  const { identity } = useParams();
  const { data: letterBoxData } = useLetterBoxQuery(identity);
  const [questions, setQuestions] = useState<{
    first: {
      question: number;
      answer: string;
    };
    second: {
      question: number;
      answer: string;
    };
  }>(() => {
    const first = Math.floor(Math.random() * QUESTION_LIST.length);

    let second = Math.floor(Math.random() * QUESTION_LIST.length);
    while (second === first) {
      second = Math.floor(Math.random() * QUESTION_LIST.length);
    }
    return {
      first: { question: first, answer: "" },
      second: { question: second, answer: "" },
    };
  });
  const [fromName, setFromName] = useState("");

  const { mutate } = useSendLetterMutation();

  function getRandomQuestion(): number {
    let result = Math.floor(Math.random() * QUESTION_LIST.length);
    while (
      questions.first.question === result ||
      questions.second.question === result
    ) {
      result = Math.floor(Math.random() * QUESTION_LIST.length);
    }
    return result;
  }

  const handleClickChangeQuestion =
    (clickFirst: boolean) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setQuestions(({ first, second }) => {
        if (clickFirst) first = { question: getRandomQuestion(), answer: "" };
        else second = { question: getRandomQuestion(), answer: "" };
        return { first, second };
      });
    };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!letterBoxData) return;
    if (!questions.first.answer || !questions.second.answer) return;
    if (!fromName) return;
    mutate(
      {
        memberId: letterBoxData.memberId,
        slotIndex: slotIndex,
        questionAnswers: [
          {
            question: QUESTION_LIST[questions.first.question],
            answer: questions.first.answer,
          },
          {
            question: QUESTION_LIST[questions.second.question],
            answer: questions.second.answer,
          },
        ],
        fromName: fromName,
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries({ queryKey: ["LETTER_BOX"] });
          onClose();
        },
      }
    );
  }

  if (!letterBoxData) return;

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <ModalContent>
          <form
            onSubmit={handleSubmit}
            style={{
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Container>
              <ModalClose onClick={onClose} />
              <ToText>To. {letterBoxData?.memberName}님</ToText>
              <QuestionWrapper>
                <QuestionText>
                  {QUESTION_LIST[questions.first.question]}
                </QuestionText>
                <QuestionChangeButton
                  onClick={handleClickChangeQuestion(true)}
                />
              </QuestionWrapper>
              <AnswerTextarea
                placeholder="내용을 입력해 주세요"
                minRows={4}
                maxRows={4}
                onChange={(event) =>
                  setQuestions((prev) => {
                    prev.first.answer = event.target.value;
                    return prev;
                  })
                }
              />
              <QuestionWrapper>
                <QuestionText>
                  {QUESTION_LIST[questions.second.question]}
                </QuestionText>
                <QuestionChangeButton
                  onClick={handleClickChangeQuestion(false)}
                />
              </QuestionWrapper>
              <AnswerTextarea
                placeholder="내용을 입력해 주세요"
                minRows={4}
                maxRows={4}
                onChange={(event) =>
                  setQuestions((prev) => {
                    prev.second.answer = event.target.value;
                    return prev;
                  })
                }
              />
              <FromInput
                startAdornment="From."
                placeholder="이름을 입력해 주세요"
                onChange={(event) => {
                  setFromName(event.target.value);
                }}
              />
            </Container>
            <LetterSubmitButton type="submit">작성 완료</LetterSubmitButton>
          </form>
        </ModalContent>
      </Modal>
      <ChildModal open={true} onClose={() => {}} />
    </>
  );
};

function ChildModal(props: { open: boolean; onClose: () => void }) {
  return (
    <Modal
      {...props}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <ModalContent>
        <div
          style={{
            backgroundColor: "white",
            padding: "16px",
            border: `1px solid ${COLOR_SET.PRIMARY}`,
            borderRadius: "8px",
            position: "relative",
          }}
        >
          <ModalClose onClick={props.onClose} />
          <h2 id="child-modal-title" className="modal-title">
            Text in a child modal
          </h2>
          <p id="child-modal-description" className="modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <button onClick={props.onClose}>Close Child Modal</button>
        </div>
      </ModalContent>
    </Modal>
  );
}
