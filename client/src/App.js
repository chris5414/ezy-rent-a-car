import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import List from "./pages/List";
import Car from "./pages/Car";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { SearchContextProvider } from "./context/SearchContext";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <SearchContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/cars/:id" element={<Car />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}
          </Routes>
        </BrowserRouter>
      </SearchContextProvider>
    </AuthContextProvider>
  );
}

export default App;
