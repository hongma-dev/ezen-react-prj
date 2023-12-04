import { useEffect, useState } from "react";
import AxiosApi from "../../api/AxoisApi";

const Category = () => {
  const [category, setCategory] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const cateList = async () => {
      try {
        const res = await AxiosApi.cateList();
        if (res.status === 200) {
          console.log(res);
          setCategory(res.data);
        }
      } catch (e) {
        console.error(e);
      }

      cateList();
    };
  }, []);

  const onInsert = async (text) => {
    const res = await AxiosApi.cateInsert(email, text);
    if (res.data) {
      const res = await AxiosApi.cateList();
      setCategory(res.data);
    }
  };

  const onRemove = async (id) => {
    const res = await AxiosApi.cateDelete(id);
    if (res.data) {
      const res = await AxiosApi.cateList();
      setCategory(res.data);
    }
  };
};

export default Category;
