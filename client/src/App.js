import {BrowserRouter,Routes,Route} from "react-router-dom"

import LogIn from "./pages/LogIn";
import Signup from "./pages/SignUp"
import Feed from "./pages/Feed";


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<LogIn/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/feed" element={<Feed/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
