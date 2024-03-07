import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Dashboard from "./Components/Dashboard";
import Dashboard1 from "./Components/Dashboard";
import Adminpage from "./Components/AdminPage";
import AdminPanel from "./Components/AdminPanel";
import SlideShow from "./Components/SlideShow";
import LandingPage from "./Components/LandingPage";
import NotFound from "./Components/NotFound";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/resetPassword/:token" element={<ResetPassword />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin.php" element={<Adminpage />}></Route>
        <Route path="/adminPanel" element={<AdminPanel />}></Route>
        <Route path="/slideshow" element={<SlideShow />}></Route>
        <Route path="*" element={<NotFound />}>
          "404 Not Found"
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
