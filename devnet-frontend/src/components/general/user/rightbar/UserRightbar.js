import "./userrightbar.css";

import { MdAddBox, MdCardGiftcard, MdPersonRemove } from "react-icons/md";
import { Users } from "../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import { Link } from "react-router-dom";
import { Ads } from "../ads";

const UserRightbar = ({ user }) => {
    
    const [friendsList, setFriendsList] = useState([]);
    const { user: currentUser , dispatch} = useContext(AuthContext);
    
    const [adNumber, setAdNumber] = useState(0);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

    const getRandomAd = () => {
        let randomNumber = Math.floor(Math.random() * 3);
        setAdNumber(randomNumber)
    }

    const followUser = async () => {
        const formData = new FormData();
        formData.append("userId", currentUser._id);
        try {
            if(followed) {
                axios.put("http://localhost:5000/api/users/unfollow/" + user._id, formData).then((response) => {
                    console.log(response.status);        
                })
                dispatch({ type: "UNFOLLOW", payload: user._id })
            } else {
                axios.put("http://localhost:5000/api/users/follow/" + user._id, formData).then((response) => {
                    console.log(response.status);        
                })
                dispatch({ type: "FOLLOW", payload: user._id })    
            }
        } catch (error) {
            console.log(error);
        }
        setFollowed(!followed);
    }

    

    useEffect(() => {
        const getFriends = async () => {
            try {
                axios.get("http://localhost:5000/api/users/followings/" + currentUser._id).then((response) => {
                    setFriendsList(response.data);
                    console.log(response.data);
                })   
            } catch (error) {
                console.log(error);
            }
        }

        getFriends();
    }, [currentUser])


    const HomeRightBar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <MdCardGiftcard className="birthdayImg" />
                    <span className="birthdayText">Amir i još 3 prijatelja</span>
                </div>
                <div onMouseOver={getRandomAd} >
                    <img className="rightbarAd" height={300} src={"/assets/images/profileImages/" + adNumber + ".png"} alt="" />
                </div>
                <h4 className="rightbarTitle">Online prijatelji</h4>
                <ul className="rightbarFriendList">
                    { Users.map(u => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        )
    }

    const ProfileRightBar = () => {
        return (
            <>
                { user._id !== currentUser._id &&
                    <button className="rightbarFollowButton" onClick={followUser}>
                        {followed ? "Otprati" : "Zaprati"}
                        {followed ? <MdPersonRemove/> : <MdAddBox/>}
                    </button>
                }
                <h4 className="rightbarTitle">Informacije o korisniku</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Grad</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Zanimanje</span>
                        <span className="rightbarInfoValue">{user.occupation}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Interesi</span>
                        <span className="rightbarInfoValue">C++, Java</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">Prijatelji</h4>
                <div className="rightbarFollowings">
                    { friendsList.map((friend, key) => (
                        <div className="rightbarFollowing" key={key}>
                            <img className="rightbarFollowingImage" src={!friend.profile_picture ? "http://localhost:5000/static/" + friend.profile_picture : "/assets/images/profileImages/noPicture.png"} />
                            <Link to={"/user-profile/" + friend._id }>
                                <span className="rightbarFollowingName">{friend.first_name}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </>

        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
            {user ? <ProfileRightBar /> : <HomeRightBar />}
            </div>
        </div>
    )
}




export default UserRightbar;