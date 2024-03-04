import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Dashboard from "./Components/Dashboard";
import Adminpage from "./Components/AdminPage";
import Vaults from "./Components/Vaults";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/resetPassword/:token" element={<ResetPassword />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin" element={<Adminpage />}></Route>
        <Route path="/vaults" element={<Vaults />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
