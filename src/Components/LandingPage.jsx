import "./Landing.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./NavBar";
import { Banner } from "./Banner";
import { Contact } from "./Contact";
import { SignUp } from "./Signup";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Contact />
      <SignUp />
    </div>
  );
}

export default App;
