import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

// import LogIn from "./pages/LogIn";
// import Signup from "./pages/SignUp"
// import Feed from "./pages/Feed";
// import Profile from "./pages/Profile";
// import Message from "./pages/Message";
import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru.json'
import AccountSetup from "./pages/AccountSetup";
import en from 'javascript-time-ago/locale/en.json'
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from "styled-components";

const LogIn = lazy(() => import("./pages/LogIn"))
const Signup = lazy(() => import("./pages/SignUp"))
const Feed = lazy(() => import("./pages/Feed"))
const Profile = lazy(() => import("./pages/Profile"))
const Message = lazy(() => import("./pages/Message"))



TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const CenteringDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

function App() {
  const user = localStorage.getItem("persist:root") ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)?.currentUser : null
  const updated = localStorage.getItem("persist:root") ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)?.signUpRes : null
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Suspense fallback={<CenteringDiv><CircularProgress/></CenteringDiv>}><Feed /></Suspense> : <Suspense fallback={<CenteringDiv><CircularProgress/></CenteringDiv>}><LogIn /></Suspense>} />
        <Route path="/signup" element={<Suspense fallback={<CenteringDiv><CircularProgress/></CenteringDiv>}><Signup /></Suspense>} />
        <Route path="/setup" element={updated ? <Suspense fallback={<CenteringDiv><CircularProgress/></CenteringDiv>}><AccountSetup /></Suspense> : <Suspense fallback={<CenteringDiv><CircularProgress/></CenteringDiv>}><Signup /></Suspense>} />
        {/* <Route path="/feed" element={}/> */}
        <Route path="/profile/:userId" element={<Suspense fallback={<CenteringDiv><CircularProgress/></CenteringDiv>}><Profile /></Suspense>} />
        <Route path="/message" element={<Suspense fallback={<CenteringDiv><CircularProgress/></CenteringDiv>}><Message /></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
