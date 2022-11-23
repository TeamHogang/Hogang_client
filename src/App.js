import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Header = lazy(() => import("./components/Header"));
const Home = lazy(() => import("./pages/Home"));
const Map = lazy(() => import("./pages/MapPage/Map"));
const Board = lazy(() => import("./pages/BoardPage/Board"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/board" element={<Board />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
