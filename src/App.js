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
          </Route>
        </Routes>
      </Router>
    </UserStore>
  );
}

export default App;
