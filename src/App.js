import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner";

const Header = lazy(() => import("./components/Header"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const Home = lazy(() => import("./pages/Home"));
const Board = lazy(() => import("./pages/BoardPage/Board"));
const Feed = lazy(() => import("./pages/BoardPage/Feed"));
const WriteFeed = lazy(() => import("./pages/BoardPage/WriteFeed"));
const Map = lazy(() => import("./pages/MapPage/MapPage"));
const AddLocation = lazy(() => import("./pages/AddLocationPage/AddLocation"));
const AdminPage = lazy(() => import("./pages/AdminPage/AdminPage"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/map" element={<Map />} />
            <Route path="/AddLocation" element={<AddLocation />} />
            <Route path="/board" element={<Board />} />
            <Route path="/write" element={<WriteFeed />} />
            <Route path="/feed/:id" element={<Feed />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
