import { Button, ButtonProps, Input, TextareaAutosize } from "@mui/base";
import { Modal, ModalClose } from "../common/Modal/Modal";
import styled from "styled-components";
import { COLOR_SET, QUESTION_LIST } from "../../constants";
import _질문바꾸기Svg from "../../assets/질문바꾸기.svg?react";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useLetterBoxQuery,
  useSendLetterMutation,
} from "../../models/letters/query";
import { MouseEvent } from "react";
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
  margin-bottom: 4px;
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
  font-weight: 400;
  font-size: 15px;
  line-height: 30px;
  resize: none;
  margin-bottom: 22px;
  color: ${COLOR_SET.PRIMARY};
  &::placeholder {
    color:rgba(0, 0, 204, 0.4)
  }
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

const Toast = styled.div`
  position: absolute;
  bottom: -30px;
  left: 0;
  right: 0;
  width: fit-content;
  margin-inline: auto;
  padding: 8px 12px;
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 10px;
  font-size: 13px;
  line-height: 16px;
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
  const { identity } = useParams();
  const { data: letterBoxData } = useLetterBoxQuery(identity);
  const [toast, setToast] = useState("");
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
  const [completed, setCompleted] = useState(false);

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

  function alertLetter(text: string) {
    setToast(text);
    setTimeout(() => setToast(""), 2000);
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
    if (!letterBoxData) return alertLetter("내용을 전부 입력해주세요.");
    if (!questions.first.answer || !questions.second.answer)
      return alertLetter("내용을 전부 입력해주세요.");
    if (!fromName) return alertLetter("내용을 전부 입력해주세요.");
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
          setCompleted(true);
        },
      }
    );
  }

  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const navigate = useNavigate();

  function handleClose() {
    if (questions.first.answer || questions.second.answer)
      setAlertModalOpen(true);
    else onClose();
  }

  if (!letterBoxData) return;

  return (
    <>
      {!completed ? (
        <Modal open={open} onClose={handleClose}>
          <ModalContent>
            <form
              onSubmit={handleSubmit}
              style={{
                maxHeight: "90vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Container
                style={{
                  backgroundImage: `url(${letterModalBg}), linear-gradient(#FFCCEE, white 10%)`,
                }}
              >
                <ModalClose onClick={handleClose} />
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
                  minRows={5}
                  maxRows={5}
                  maxLength={500}
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
                  minRows={5}
                  maxRows={5}
                  maxLength={500}
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
            {toast && <Toast>{toast}</Toast>}
          </ModalContent>
        </Modal>
      ) : (
        <Modal open={open} onClose={onClose}>
          <ModalContent
            style={{
              maxWidth: "327px",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "16px",
                border: `1px solid ${COLOR_SET.PRIMARY}`,
                borderRadius: "8px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ModalClose onClick={onClose} />
              <div
                id="child-modal-title"
                className="modal-title"
                style={{
                  fontSize: "15px",
                  color: COLOR_SET.PRIMARY,
                  marginBottom: "40px",
                }}
              >
                작성 완료!
              </div>
              <div
                id="child-modal-description"
                className="modal-description"
                style={{
                  fontSize: "13px",
                  color: COLOR_SET.PRIMARY,
                  whiteSpace: "pre-line",
                  textAlign: "center",
                  marginBottom: "30px",
                }}
              >
                친구에게 편지가 전달되었어요!
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: "11px",
                }}
              >
                <Button
                  style={{
                    padding: "10px",
                    flex: 1,
                    border: `1px solid ${COLOR_SET.PRIMARY}`,
                    borderRadius: "8px",
                    backgroundColor: COLOR_SET.PRIMARY,
                    color: "white",
                  }}
                  onClick={() => navigate("/")}
                >
                  나도 친구들에게 편지 받기
                </Button>
                <Button
                  style={{
                    padding: "10px",
                    flex: 1,
                    border: `1px solid ${COLOR_SET.SECONDARY}`,
                    borderRadius: "8px",
                    backgroundColor: COLOR_SET.SECONDARY,
                    color: "white",
                  }}
                  onClick={() => {
                    window.open("https://lettersto.onelink.me/DSlL/lsi6f4rt");
                  }}
                >
                  더 많은 사람들과 편지 주고받기
                </Button>
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}
      <ChildModal
        open={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        onConfirm={() => {
          setAlertModalOpen(false);
          onClose();
        }}
      />
    </>
  );
};

function ChildModal(props: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal {...props}>
      <ModalContent
        style={{
          maxWidth: "327px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "16px",
            border: `1px solid ${COLOR_SET.PRIMARY}`,
            borderRadius: "8px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ModalClose onClick={props.onClose} />
          <div
            id="child-modal-title"
            className="modal-title"
            style={{
              fontSize: "15px",
              color: COLOR_SET.PRIMARY,
              marginBottom: "40px",
            }}
          >
            나가기
          </div>
          <div
            id="child-modal-description"
            className="modal-description"
            style={{
              fontSize: "13px",
              color: COLOR_SET.PRIMARY,
              whiteSpace: "pre-line",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            {`작성 중인 편지 내용은\n 저장되지 않아요!\n 나가시겠어요?`}
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "13px",
            }}
          >
            <Button
              style={{
                padding: "10px",
                flex: 1,
                border: `1px solid ${COLOR_SET.PRIMARY}`,
                borderRadius: "8px",
                backgroundColor: "white",
                color: COLOR_SET.PRIMARY,
              }}
              onClick={props.onConfirm}
            >
              나가기
            </Button>
            <Button
              style={{
                padding: "10px",
                flex: 1,
                border: `1px solid ${COLOR_SET.PRIMARY}`,
                borderRadius: "8px",
                backgroundColor: COLOR_SET.PRIMARY,
                color: "white",
              }}
              onClick={props.onClose}
            >
              이어서 쓰기
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
