import Navbar from "./components/Navbar/Navbar";
import About from "./pages/About/About";
import HomeC from "./pages/Home/Home";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import Login from "./components/login/Login";
import Footer from "./pages/footer/Footer";
import Signup1 from "./components/signUp1/signup1";
import Services from "./pages/Service/Services";
import Profile from "./pages/profile/Profile.tsx";
import Profileinfo from "./pages/profileInformation/profileinfo.tsx";
import { connectSocket, socket } from "./socket.tsx";

function App() {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const user = useSelector((state: any) => state.auth.user);
  if (!socket.connected) {
    connectSocket(user.userid);
  }
  return (
    <>
      {" "}
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomeC />
              <About />
              <Footer />
            </>
          }
        />
        <Route path="/signup" element={<Signup1 />} />
        <Route path="/profile/:serviceid" element={<Profileinfo />} />
        <Route path="/services/:category" element={<Services />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Login />}
        />
        <Route path="/CreateService/:tab" element={<Profile />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Profile /> : <Login />}
        />
      </Routes>
    </>
  );
}

export default App;
