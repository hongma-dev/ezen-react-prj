import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AxiosApi from "../api/AxoisApi";
import styled from "styled-components";
import { Common } from "../utils/Common";
import { storage } from "../api/firebase";
import { UserContext } from "../context/UserStore";

const Container = styled.div`
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 320px;
  margin: 20px auto;
  background: rgba(0, 0, 0, 0.2);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const UserName = styled.h2`
  margin-left: 20px;
`;

const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-right: 10px;
`;

const Field = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
const Label = styled.label`
  display: block;
  margin: 20px 30px;
  font-weight: bold;
`;
const SubmitButton = styled.button`
  padding: 8px;
  background-color: #4caf50;
  width: 60px;
  margin-left: 4px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #2c7d32;
  }
`;

const MemberInfo = () => {
  const { email } = useParams();
  const [member, setMember] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const context = useContext(UserContext);
  const { setName } = context;

  useEffect(() => {
    const memberInfo = async () => {
      const res = await AxiosApi.memberGetOne(email);

      try {
        setMember(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    memberInfo();

    const loginUserEmail = localStorage.getItem("email");
    if (loginUserEmail === email) {
      setIsCurrentUser(true);
    }
  }, [email]);

  // 입력 필드 변경 처리
  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFile(e.target.files[0]);
    } else {
      setEditName(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await AxiosApi.memberUpdate(email, editName, url);

    if (res.status === 200) {
      setEditMode(false);
      setName(editName);
      const memberRes = await AxiosApi.memberGetOne(email);
      setMember(memberRes.data);
      setUrl(memberRes.data.image);
    }
  };

  const handleUploadClick = async () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      // 업로드 후 이미지 URL 가져오기
      const uploadedUrl = await fileRef.getDownloadURL();
      console.log("uploadUrl >>>>>>> ", uploadedUrl);
      setUrl(uploadedUrl); // 미리보기 URL 업데이트
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <Container>
      <UserInfo>
        <UserImage
          src={url || member.image || "http://via.placeholder.com/160"}
          alt="User"
        />
        {!editMode ? (
          <UserName>{member.name}</UserName>
        ) : (
          <Input
            type="text"
            name="name"
            placeholder="이름을 입력하세요."
            value={editName}
            onChange={handleChange}
          />
        )}
      </UserInfo>
      {!editMode ? (
        <>
          <Field>
            <Label>Email : {member.email}</Label>
          </Field>
          <Field>
            <Label>가입일 : {Common.timeFromNow(member.regDate)}</Label>
            {/* <Label>가입일 : {member.regDate}</Label> */}
          </Field>
          {/* 현재 사용자가 로그인한 사용자인 경우에만 편집 버튼 표시 */}
          {isCurrentUser && (
            <SubmitButton onClick={() => setEditMode(true)}>편집</SubmitButton>
          )}
        </>
      ) : (
        <>
          <Field>
            <Label>이미지 업로드</Label>
            <input type="file" name="file" onChange={handleChange} />
            <SubmitButton onClick={handleUploadClick}>업로드</SubmitButton>
          </Field>
          {/* 필요한 다른 입력 필드 */}
          <SubmitButton onClick={handleSubmit}>전송</SubmitButton>
          <SubmitButton onClick={() => setEditMode(false)}>취소</SubmitButton>
        </>
      )}
    </Container>
  );
};

export default MemberInfo;
