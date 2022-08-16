import React from "react";
import "./scss/app.scss";
import { Header } from "./components/header";
import { Home } from "../src/pages/Home";
import Cart from "./pages/Cart";
import NotFound404 from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, test } from "./services/slices/filterSlice";

export const AppContext = React.createContext();


function App() {
  const [searchValue, setSearchValue] = React.useState("");
  const dispatch = useDispatch()

  console.log(searchValue);
  return (
    <div className="wrapper">
    
      <AppContext.Provider value={{searchValue, setSearchValue}}>
        <Header  />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
