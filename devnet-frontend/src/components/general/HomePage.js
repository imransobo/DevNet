import React, { useEffect, useState } from 'react';
import axios from "axios";
import UserSidebar from './user/sidebar/UserSidebar';
import UserFeed from './user/feed/UserFeed';
import UserRightbar from './user/rightbar/UserRightbar';
import Header from "./Header";

const HomePage = () => {
    
    return (
        <>
        <div className="homeContainer">
          <UserSidebar />
          <UserFeed/>
          <UserRightbar/>
        </div>
      </>
    )
}

export default HomePage;