import {BrowserRouter,Routes,Route} from "react-router-dom"

import LogIn from "./pages/LogIn";
import Signup from "./pages/SignUp"


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<LogIn/>}/>
    <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
