import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxoisApi";
import { storage } from "../../api/firebase";

const FormContainer = styled.div`
  padding: 20px;
  margin: auto;
  max-width: 600px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center; // 수직 방향 중앙 정렬
  margin-bottom: 20px; // 하단 여백 추가
`;

const StyledLabel = styled.label`
  flex: 0 0 100px; // 라벨의 너비 고정
  margin-right: 10px; // 라벨과 입력 필드 사이 여백
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 90%; // 너비를 100%로 설정하여 컨테이너의 너비에 맞춤
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 20px; // 입력창 아래에 여백 추가
`;

const StyledTextarea = styled.textarea`
  width: 90%; // 너비를 100%로 설정하여 컨테이너의 너비에 맞춤
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  height: 100px;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; // 버튼을 중앙에 위치시킴
  margin-top: 20px; // 버튼 상단에 여백 추가
  gap: 10px; // 버튼 사이에 여백 추가
`;

const UserImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 5px;
  margin-top: 20px;
`;

const UploadButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledSelect = styled.select`
  width: 90%; // 너비 설정
  padding: 10px; // 패딩 추가
  border: 1px solid #ddd; // 테두리 스타일링
  border-radius: 4px; // 테두리 둥글게
  font-size: 16px; // 글꼴 크기
  background-color: white; // 배경색
  cursor: pointer; // 마우스 커서 변경
  margin-bottom: 20px; // 아래쪽 여백

  &:hover {
    border-color: #bcbcbc; // 호버 시 테두리 색상 변경
  }

  &:focus {
    outline: none;
    border-color: #4caf50; // 포커스 시 테두리 색상 변경
  }
`;
const BoardWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await AxiosApi.cateList();
        console.log("res >>>>>>>>>> ", res);
        setCategories(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    getCategories();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await AxiosApi.boardWrite(
        selectedCategory,
        content,
        email,
        url,
        title
      );
      if (res.data) {
        navigate("/boards");
      } else {
        alert("글쓰기 실패");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleReset = () => {
    setTitle("");
    setContent("");
    navigate("/boards");
  };

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = async () => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      await fileRef.put(file);

      const url = await fileRef.getDownloadURL();

      setUrl(url);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <FormContainer>
      <Title>글쓰기</Title>
      <FieldContainer>
        <StyledSelect
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
        >
          <option value="" disabled selected>
            카테고리를 선택하세요.
          </option>
          {categories &&
            categories.map((el, idx) => (
              <option key={idx} value={el.categoryId}>
                {el.categoryName}
              </option>
            ))}
        </StyledSelect>
      </FieldContainer>

      <FieldContainer>
        <StyledLabel htmlFor="title">제목</StyledLabel>
        <StyledInput
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
      </FieldContainer>
      <FieldContainer>
        <StyledLabel htmlFor="content">내용</StyledLabel>
        <StyledTextarea
          id="content"
          name="content"
          value={content}
          onChange={handleContentChange}
        />
      </FieldContainer>
      <FileUploadContainer>
        <StyledInput type="file" onChange={handleFileInputChange} />
        <UploadButton onClick={handleUploadClick}>Upload</UploadButton>
      </FileUploadContainer>
      {url && <UserImage src={url} alt="uploaded" />}
      <ButtonContainer>
        <SubmitButton onClick={handleSubmit}>글쓰기</SubmitButton>
        <SubmitButton onClick={handleReset}>취소</SubmitButton>
      </ButtonContainer>
    </FormContainer>
  );
};

export default BoardWrite;
