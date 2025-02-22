import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./register";
import Signin from "./login";
import Profile from "./Profile";

function App() {
  return (
    <>
    <h1>url for register: /signup</h1>
    <h1>url for signin: /signin</h1>
    <h1>url for profile: /profile</h1>
   
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
