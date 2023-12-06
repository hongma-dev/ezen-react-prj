import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./signup/Login";
import Signup from "./signup/Signup";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Members from "./pages/Members";
import MemberInfo from "./pages/MemberInfo";
import UserStore from "./context/UserStore";
import ThemeSetting from "./pages/ThemeSetting";
import Category from "./pages/board/Category";
import BoardList from "./pages/board/BoardList";
import BoardWrite from "./pages/board/BoardWrite";
import BoardDetail from "./pages/board/BoardDetail";

function App() {
  return (
    <UserStore>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route element={<Layout />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/members" element={<Members />} />
            <Route path="/memberInfo/:email" element={<MemberInfo />} />
            <Route path="/theme" element={<ThemeSetting />} />
            <Route path="/category" element={<Category />} />
            <Route path="/boards" element={<BoardList />} />
            <Route path="/boardwrite" element={<BoardWrite />} />
            <Route path="/boardDetail/:id" element={<BoardDetail />} />
          </Route>
        </Routes>
      </Router>
    </UserStore>
  );
}

export default App;
