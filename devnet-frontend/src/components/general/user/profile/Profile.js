import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Header";
import UserFeed from "../feed/UserFeed";
import UserRightbar from "../rightbar/UserRightbar";
import UserSidebar from "../sidebar/UserSidebar";

import "./profile.css"

const Profile = () => {

    const [user, setUser] = useState({});
    const userId = useParams().userId;

    
    useEffect(() => {
        document.title = "Profile";
        
        const fetchUser = async () => {
            const response = await axios.get(`http://localhost:5000/api/users/details/${userId}`)
            setUser(response.data);   
        }
        fetchUser();
    }, [userId]);

    return (
        <> 
            <div className="profile">
                <UserSidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImage" crossOrigin="anonymous" src={ user.cover_picture === "" ? "/assets/images/profileImages/noCover.png" : "http://localhost:5000/static/" + user.cover_picture }/>
                            <img className="profileUserImage" crossOrigin="anonymous" src={ user.profile_picture ? "http://localhost:5000/static/" + user.profile_picture : "/assets/images/profileImages/noCover.png"  }/>
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.first_name + " " + user.last_name}</h4>
                            <span className="profileInfoDesc">Opis profila</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <UserFeed userId={userId} />
                        <UserRightbar user={user} />
                    </div>
                </div>
                
            </div>

        </>
    )


}

export default Profile;