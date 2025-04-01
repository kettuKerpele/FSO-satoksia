import {BrowserRouter, Routes, Route} from "react-router-dom";

import AllUsers from "./pages/AllData";
import Add from "./pages/AddNew";
import Update from "./pages/Update";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllUsers/>}/>
          <Route path='/AddNew' element={<Add/>}/>
          <Route path='/update/:id' element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;