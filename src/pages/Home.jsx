import { useNavigate } from "react-router-dom";
import { ButtonContainer, TransBtn } from "../component/HomeComponent";

const Home = () => {
  const navigate = useNavigate();
  const onClickBtn = (num) => {
    switch (num) {
      case 1:
        navigate("/members");
        break;
      case 2:
        navigate("/theme");
        break;
      case 3:
        navigate("/boards");
        break;
      case 4:
        navigate("/category");
        break;
      case 5:
        navigate("/movies");
        break;
      case 6:
        navigate("/Chat");
        break;
      case 7:
        navigate("/public");
        break;
      default:
    }
  };
  return (
    <ButtonContainer>
      <TransBtn onClick={() => onClickBtn(1)}>회원리스트</TransBtn>
      <TransBtn onClick={() => onClickBtn(2)}>테마변경</TransBtn>
      <TransBtn onClick={() => onClickBtn(3)}>게시판</TransBtn>
      <TransBtn onClick={() => onClickBtn(4)}>카테고리</TransBtn>
      <TransBtn onClick={() => onClickBtn(5)}>영화정보</TransBtn>
      <TransBtn onClick={() => onClickBtn(6)}>채팅</TransBtn>
      <TransBtn onClick={() => onClickBtn(7)}>공공데이터</TransBtn>
    </ButtonContainer>
  );
};
export default Home;
