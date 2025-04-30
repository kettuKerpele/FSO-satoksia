import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePageFunc from "./pages/Home";
import LogIn from "./pages/newUserLogin"; 
import All from "./pages/AllData";
import Add from "./pages/AddNew";
import Update from "./pages/Update";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePageFunc/>}/>
          <Route path="/newUserLogin" element={<LogIn/>}/>
          <Route path="/AllData" element={<All/>}/>
          <Route path='/AddNew' element={<Add/>}/>
          <Route path='/update/:id' element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;