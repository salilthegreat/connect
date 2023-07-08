import {BrowserRouter,Routes,Route} from "react-router-dom"

import LogIn from "./pages/LogIn";
import Signup from "./pages/SignUp"
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Message from "./pages/Message";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

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
