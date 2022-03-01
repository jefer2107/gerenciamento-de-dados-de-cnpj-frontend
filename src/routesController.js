import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserEdit from "./edits/userEdit";
import Login from "./home/login";
import ClientData from "./lists/clientData";
import ClientList from "./lists/clientList";
import UserList from "./lists/userList";
import Search from "./registers/search";
import UserRegister from "./registers/userRegister";


export default function RoutesController(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/search" element={<Search/>} />
                <Route exact path="/client-list" element={<ClientList/>} />
                <Route exact path="/client-data/:id" element={<ClientData/>} />
                <Route exact path="/user-register" element={<UserRegister/>} />
                <Route exact path="/user-list" element={<UserList/>} />
                <Route exact path="/user-edit/:id" element={<UserEdit/>} />
                <Route exact path="/" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    )
}