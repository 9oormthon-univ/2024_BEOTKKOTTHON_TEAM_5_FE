import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/root/LandingPage";
import HomeIndexPage from "./pages/home/HomeIndexPage";
import ChatIndexPage from "./pages/chat/ChatIndexPage";
import FestivalIndexPage from "./pages/festival/FestivalIndexPage";
import MyIndexPage from "./pages/mypage/MyIndexPage";
import UserRegisterPage from "./pages/register/UserRegisterPage";
import UnivRegisterPage from "./pages/register/UnivRegisterPage";
import DonePage from "./pages/register/DonePage";
import ProfileRegisterPage from "./pages/register/ProfileRegisterPage";
import ChatPage from "./pages/chat/ChatPage";
import NavLayout from "./layouts/NavLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/register/user" element={<UserRegisterPage />} />
        <Route path="/register/univ" element={<UnivRegisterPage />} />
        <Route path="/register/done" element={<DonePage />} />
        <Route path="/register/profile" element={<ProfileRegisterPage />} />

        <Route element={<NavLayout />}>
          <Route path="/home" element={<HomeIndexPage />} />

          <Route path="/chat" element={<ChatIndexPage />} />
          <Route path="/chat/:chatRoomId" element={<ChatPage />} />

          <Route path="/festival" element={<FestivalIndexPage />} />

          <Route path="/mypage" element={<MyIndexPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
