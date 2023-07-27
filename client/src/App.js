import {BrowserRouter,Routes,Route} from "react-router-dom"

import LogIn from "./pages/LogIn";
import Signup from "./pages/SignUp"
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Message from "./pages/Message";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import AccountSetup from "./pages/AccountSetup";

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

function App() {
  const user = localStorage.getItem("persist:root") ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)?.currentUser : null
  const updated = localStorage.getItem("persist:root") ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)?.signUpRes : null
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={user ? <Feed/> : <LogIn/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/setup" element={updated ? <AccountSetup/> : <Signup/>}/>
    {/* <Route path="/feed" element={}/> */}
    <Route path="/profile/:userId" element={<Profile/>}/>
    <Route path="/message" element={<Message/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
