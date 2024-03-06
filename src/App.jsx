import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Dashboard from "./Components/Dashboard";
import Dashboard1 from "./Components/Dashboard1";
import Adminpage from "./Components/AdminPage";
import Vaults from "./Components/Vaults";
import LandingPage from "./Components/LandingPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/resetPassword/:token" element={<ResetPassword />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/dashboard1" element={<Dashboard1 />}></Route>
        <Route path="/admin.php" element={<Adminpage />}></Route>
        <Route path="/vaults" element={<Vaults />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
