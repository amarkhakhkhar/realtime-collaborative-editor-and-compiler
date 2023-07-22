import "./App.css";
import Home from "./Home";
import Landing from "./components/Landing";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/editor/:roomId"
            element={<Landing />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )

  // return <Home />;
}

export default App;
