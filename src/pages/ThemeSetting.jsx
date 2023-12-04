import { useContext } from "react";
import { UserContext } from "../context/UserStore";
import styled from "styled-components";
import { ButtonContainer, TransBtn } from "../component/HomeComponent";

const ThemeSetting = () => {
  const context = useContext(UserContext);
  const { setColor } = context;
  const themeColorChange = (color) => {
    setColor(color);
  };

  return (
    <>
      <ButtonContainer>
        <TransBtn>컬러 테암 설정</TransBtn>
      </ButtonContainer>
      <ButtonContainer>
        <TransBtn
          color="orange"
          onClick={() => {
            themeColorChange("orange");
          }}
        >
          오렌지
        </TransBtn>
        <TransBtn
          color="green"
          onClick={() => {
            themeColorChange("green");
          }}
        >
          그린
        </TransBtn>
        <TransBtn
          color="lightgray"
          onClick={() => {
            themeColorChange("lightgray");
          }}
        >
          밝은회색
        </TransBtn>
        <TransBtn
          color="darkgray"
          onClick={() => {
            themeColorChange("darkgray");
          }}
        >
          어두운회색
        </TransBtn>
        <TransBtn
          color="royalblue"
          onClick={() => {
            themeColorChange("royalblue");
          }}
        >
          royalblue
        </TransBtn>
      </ButtonContainer>
    </>
  );
};

export default ThemeSetting;
