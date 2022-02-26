import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import ClientRegister from "./registers/clientRegister";
import Search from "./registers/search";


export default function RoutesController(){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route exact path="/client-register/:id" element={<ClientRegister/>} />
                <Route exact path="/search" element={<Search/>} />
            </Routes>
        </BrowserRouter>
    )
}