import Signup from "./features/auth/Signup.jsx";
import Login from "./features/auth/Login.jsx";
import "./App.css";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Login />
      <Signup />
    </>
  );
}

export default App;
