import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./home/login";
import Header from "./components/header";
import ClientData from "./lists/clientData";
import ClientList from "./lists/clientList";
import Search from "./registers/search";


export default function RoutesController(){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route exact path="/search" element={<Search/>} />
                <Route exact path="/client-list" element={<ClientList/>} />
                <Route exact path="/client-data/:id" element={<ClientData/>} />
                <Route exact path="/" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    )
}