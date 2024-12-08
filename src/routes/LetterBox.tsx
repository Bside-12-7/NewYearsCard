import { useParams } from "react-router-dom";
import styled from "styled-components";
import { COLOR_SET } from "../constants";
import { EmptyPostBox } from "../components/PostBox/EmptyPostBox";
import { FilledPostBox } from "../components/PostBox/FilledPostBox";
import 편지가_도착한_사서함을_클릭해_편지를_확인해보세요 from "../assets/편지가_도착한_사서함을_클릭해_편지를_확인해보세요.png";
import 사서함을_클릭해_편지를_확인해보세요 from "../assets/사서함을_클릭해_편지를_확인해보세요.png";

const Container = styled.div`
  margin-inline: auto;
  padding-block: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    padding-block: 60px;
  }
`;

const Title = styled.span`
  line-height: 64px;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 30px;
  color: ${COLOR_SET.PRIMARY};
  @media (max-width: 600px) {
    line-height: 27px;
    font-size: 20px;
    margin-bottom: 24px;
  }
`;

const LetterBoxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 536px;
  @media (max-width: 600px) {
    width: 268px;
  }
`;

const LetterCTA = styled.img<{ screen?: "desktop" | "mobile" }>`
  height: 69.5px;
  margin-bottom: 30px;
  @media (max-width: 600px) {
    height: 35px;
    margin-bottom: 12px;
  }
  display: ${(props) => (props.screen === "desktop" ? "block" : "none")};
  @media (max-width: 600px) {
    display: ${(props) => (props.screen === "desktop" ? "none" : "block")};
  }
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
    const postBoxList = new Array(20)
      .fill(null)
      .map((_, index) => <EmptyPostBox key={index} />);

    data.seasonGreetingLetterResponses.forEach((post) => {
      postBoxList[post.slotIndex] = (
        <FilledPostBox key={postBoxList[post.slotIndex].key} post={post} />
      );
    });

    return postBoxList;
  };

  return (
    <Container>
      <Title>{data.memberName}의 사서함</Title>
      <LetterCTA
        screen="desktop"
        src={편지가_도착한_사서함을_클릭해_편지를_확인해보세요}
      />
      <LetterCTA screen="mobile" src={사서함을_클릭해_편지를_확인해보세요} />
      <LetterBoxWrapper>{generatePostBoxList()}</LetterBoxWrapper>
    </Container>
  );
}
