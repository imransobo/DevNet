import { Routes, Route, Navigate } from "react-router-dom";

//Komponente
import HomePage from "../HomePage";
import Header from "../Header";
import Register from "../Register";
import Login from "../login/Login";

//User
import UserFeed from "../user/feed/UserFeed";
import UserLogout from "../user/UserLogout";

import "../main/main.css";
import Profile from "../user/profile/Profile";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import Messenger from "../messenger/Messenger";
import About from "../About";
import ChangePassword from "../changePassword/ChangePassword";
import EditProfile from "../editProfile/EditProfile";
import Contact from "../contact/Contact";
import Search from "../user/search/Search";

const Main = () => {

  const { user } = useContext(AuthContext);

  return (
    <>
      <Header />
      <div className="homeContainer"></div>
      <Routes>
          <Route exact path="/" element={ user ? (<HomePage />) : (<Register/>) } />
          <Route path="/user-register" element={ user ? (<UserFeed />) : (<Register/> )} />
          <Route path="/user-login" element={ user ? ( <Navigate replace to={"/user-feed"}/> ) : (<Login/>) } />
          <Route path="/user-feed" element={ user ? (<HomePage />) : (<Navigate replace to={"/user-register"}/> )} /> 
          <Route path="/user-profile/:userId" element={ user ? <Profile /> : (<Navigate replace to={"/user-register"}/> ) } />
          <Route path="/messenger" element={ !user ? (<Navigate replace to={"/user-register"}/> ) : (<Messenger />) } />  
          <Route path="/about" element={ <About />} />
          <Route path="/change-password" element={ <ChangePassword />} />
          <Route path="/edit-profile" element={ <EditProfile /> } />
          <Route path="/contact" element={ <Contact /> } />
          <Route path="/search/:query" element={ <Search /> } />
          <Route path="/user-logout" element={<UserLogout />} />
        </Routes> 
    </>
  );
};

export default Main;