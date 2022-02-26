import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import ClientList from "./lists/clientList";
import ClientRegister from "./registers/clientRegister";
import Search from "./registers/search";


export default function RoutesController(){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route exact path="/client-register/:id" element={<ClientRegister/>} />
                <Route exact path="/search" element={<Search/>} />
                <Route exact path="/client-list" element={<ClientList/>} />
            </Routes>
        </BrowserRouter>
    )
}