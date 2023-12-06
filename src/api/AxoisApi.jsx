import axios from "axios";
import { EZEN_DOMAIN } from "../utils/Common";

const AxiosApi = {
  // 로그인
  memberLogin: async (email, pw) => {
    const login = {
      email: email,
      pwd: pw,
    };
    return await axios.post(EZEN_DOMAIN + "/users/login", login);
  },
  // 회원 가입 여부 확인
  memerRegCheck: async (email) => {
    return await axios.get(EZEN_DOMAIN + `/users/check?email=${email}`);
  },
  // 회원 가입
  memberReg: async (email, pwd, name) => {
    const member = {
      email: email,
      pwd: pwd,
      name: name,
    };
    return await axios.post(EZEN_DOMAIN + "/users/new", member);
  },
  // 회원 상세 조회
  memberGetOne: async (email) => {
    return await axios.get(EZEN_DOMAIN + `/users/detail/${email}`);
  },

  memberGet: async () => {
    return await axios.get(EZEN_DOMAIN + `/users/list`);
  },

  memberUpdate: async (email, editName, url) => {
    const member = {
      email: email,
      name: editName,
      image: url,
    };
    return await axios.put(EZEN_DOMAIN + `/users/modify`, member);
  },

  cateList: async () => {
    return await axios.get(EZEN_DOMAIN + `/api/category/list`);
  },

  cateInsert: async (email, category) => {
    const cate = {
      email,
      categoryName: category,
    };
    return await axios.post(EZEN_DOMAIN + `/api/category/new`, cate);
  },
  cateDelete: async (id) => {
    return await axios.delete(EZEN_DOMAIN + `/api/category/delete/${id}`);
  },

  getBoardList: async () => {
    return await axios.get(EZEN_DOMAIN + `/api/board/list`);
  },

  boardWrite: async (selectedCategory, content, email, url, title) => {
    const params = {
      categoryId: selectedCategory,
      content: content,
      email: email,
      img: url,
      title: title,
    };

    return await axios.post(EZEN_DOMAIN + `/api/board/new`, params);
  },
};

export default AxiosApi;
