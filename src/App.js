import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Header = lazy(() => import("./components/Header"));
const Home = lazy(() => import("./pages/Home"));
const Map = lazy(() => import("./pages/MapPage/MapPage"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
