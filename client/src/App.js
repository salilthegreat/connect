import {BrowserRouter,Routes,Route} from "react-router-dom"

import LogIn from "./pages/LogIn";
import Signup from "./pages/SignUp"
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Message from "./pages/Message";


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<LogIn/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/feed" element={<Feed/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/message" element={<Message/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
