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
import LoginPage from "./pages/root/LoginPage";
import ProfileEditPage from "./pages/mypage/ProfileEditPage";
import ChatInboxPage from "./pages/chat/ChatInboxPage";
import FestivalDetailPage from "./pages/festival/FestivalDetailPage";
import { Helmet } from "react-helmet-async";


function App() {
  return (

    <BrowserRouter>
      <Helmet>
        <title>디폴트</title>
        <meta property='og:type' content='website' />
        <meta property="og:url" content="https://dis-tance.com/" />
        <meta property="og:title" content="Distance" />
        <meta property="og:description" content="축제를 200% 즐기는 방법5" />
        <meta property="og:image" content="https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228092421948485.jpg" />
      </Helmet>

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register/user" element={<UserRegisterPage />} />
        <Route path="/register/univ" element={<UnivRegisterPage />} />
        <Route path="/register/done" element={<DonePage />} />
        <Route path="/register/profile" element={<ProfileRegisterPage />} />

        <Route element={<NavLayout />}>
          <Route path="/home" element={<HomeIndexPage />} />

          <Route path="/chat" element={<ChatIndexPage />} />
          <Route path="/inbox" element={<ChatInboxPage />} />

          <Route path="/festival" element={<FestivalIndexPage />} />
          <Route path="/festival/detail" element={<FestivalDetailPage />} />

          <Route path="/mypage" element={<MyIndexPage />} />
          <Route path="/mypage/profile" element={<ProfileEditPage />} />
        </Route>

        <Route path="/chat/:chatRoomId" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
